import os
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify
from google import genai
from google.genai import types

load_dotenv()

# Serve static assets (CSS/JS) directly from src/ root
app = Flask(__name__, template_folder='templates', static_folder='.')
@app.route("/")
def gallery():
    return render_template("gallery.html")

@app.route("/workbench", methods=["GET", "POST"])
def workbench():
    pantun = request.args.get("pantun", "")
    translation = None
    cultural_notes = None
    pembayang = ""
    maksud = ""
    symbolism = ""
    alternatives = []
    error = None

    if request.method == "POST":
        if request.is_json:
            data = request.get_json() or {}
            pantun = data.get("pantun", "").strip()
            source_lang = data.get("source_lang", "ms").strip()
            target_lang = data.get("target_lang", "en").strip()
        else:
            pantun = request.form.get("pantun", "").strip()
            source_lang = request.form.get("source_lang", "ms").strip()
            target_lang = request.form.get("target_lang", "en").strip()

        if not pantun:
            error = "Please enter any pantun to translate."
            if request.is_json:
                return jsonify({"error": error}), 400
        elif not os.getenv("GEMINI_API_KEY"):
            error = "The AI API key has not been configured."
            if request.is_json:
                return jsonify({"error": error}), 500
        else:
            try:
                client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
                response = client.models.generate_content(
                    model="gemini-3.5-flash-lite",
                    contents=pantun,
                    config=types.GenerateContentConfig(
                        system_instruction=f"""
                        You are an expert literary and cultural translation assistant specialising in Malay pantun.
                        Translate the given text from language code '{source_lang}' into language code '{target_lang}'.
                        
                        STRICT RULES:
                        1. Preserve the EXACT line count and structure of the source text. If the source has 2 lines, 4 lines, 6 lines, or more, your translation must match that exact line count. Do not force everything to 4 lines.
                        2. Immediately follow the translation with the exact separator: ===CULTURAL_SPLIT===
                        3. Provide the cultural analysis with headers PEMBAYANG:, MAKSUD:, and SYMBOLISM:, then use: ===ALT_SPLIT===
                        4. Provide alternative translation lines for EVERY line in the poem, labeled precisely with its line number (e.g., LINE 1 ALT:, LINE 2 ALT:, LINE 3 ALT:, etc.).

                        Format strictly like this:
                        [Translated line 1]
                        [Translated line 2]
                        ...
                        ===CULTURAL_SPLIT===
                        PEMBAYANG: [Explanation]
                        MAKSUD: [Explanation]
                        SYMBOLISM: [Explanation]
                        ===ALT_SPLIT===
                        LINE 1 ALT: [Alternative for line 1]
                        LINE 3 ALT: [Alternative for line 3]
                        LINE 4 ALT: [Alternative for line 4]
                        """,
                    ),
                )

                raw_text = response.text
                
                alt_parts = raw_text.split("===ALT_SPLIT===")
                main_body = alt_parts[0]
                alt_raw = alt_parts[1].strip() if len(alt_parts) > 1 else ""

                cultural_parts = main_body.split("===CULTURAL_SPLIT===")
                translation = cultural_parts[0].strip()
                cultural_raw = cultural_parts[1].strip() if len(cultural_parts) > 1 else ""

                # Keep exact line count of whatever the poem has (no artificial slicing)
                translation_lines = [line.strip() for line in translation.splitlines() if line.strip()]
                translation = "\n".join(translation_lines)

                # Parse Cultural sections natively
                pembayang, maksud, symbolism = "", "", ""
                if "PEMBAYANG:" in cultural_raw:
                    parts = cultural_raw.split("MAKSUD:") if "MAKSUD:" in cultural_raw else [cultural_raw]
                    pembayang = parts[0].replace("PEMBAYANG:", "").strip()
                    if len(parts) > 1:
                        rest = parts[1]
                        if "SYMBOLISM:" in rest:
                            sub_parts = rest.split("SYMBOLISM:")
                            maksud = sub_parts[0].strip()
                            symbolism = sub_parts[1].strip()
                        else:
                            maksud = rest.strip()
                else:
                    pembayang = cultural_raw

                # Parse alternatives dynamically for any line count
                alternatives = []
                import re
                for alt_line in alt_raw.splitlines():
                    if ":" in alt_line:
                        label, text = alt_line.split(":", 1)
                        label_clean = label.strip().upper()
                        # Extract the line number using regex (e.g., "LINE 5 ALT" -> index 4)
                        nums = re.findall(r'\d+', label_clean)
                        idx = int(nums[0]) - 1 if nums else 0
                        
                        alternatives.append({
                            "index": idx,
                            "label": label.strip(), 
                            "text": text.strip().strip('"\'')
                        })
                        
                if request.is_json:
                    return jsonify({
                        "translation": translation,
                        "pembayang": pembayang,
                        "maksud": maksud,
                        "symbolism": symbolism,
                        "alternatives": alternatives
                    })

            except Exception:
                app.logger.exception("Pantun translation failed")
                error = "The translation could not be completed. Please try again."
                if request.is_json:
                    return jsonify({"error": error}), 500

    # GUARANTEED FALLBACK RETURN STATEMENT FOR ALL REQUESTS (GET or failed POST)
    return render_template(
        "workbench.html",
        pantun=pantun,
        result=translation,
        pembayang=pembayang,
        maksud=maksud,
        symbolism=symbolism,
        alternatives=alternatives,
        error=error,
    )

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)