import random
import json

# Number of distinct words to use
NUM_DISTINCT_WORDS = 5000

# Target total number of words (after duplicating by frequency)
TOTAL_WORDS = 50000

# Load the top 5000 words from the frequency list
with open("words.txt", "r", encoding="utf-8") as f:
    lines = [line.strip() for line in f if line.strip()]
    top_words = lines[:NUM_DISTINCT_WORDS]

# Process words and normalize their weights
weighted_words = []

for line in top_words:
    parts = line.split()
    if len(parts) != 2:
        continue
    word, freq_str = parts
    try:
        freq = int(freq_str)
        # Normalize: large frequencies become smaller repeat weights
        weight = round(freq / 1_000_000_000)  # tune this divisor as needed
        weight = max(1, min(weight, 10))      # clamp to range 1–10
        weighted_words.extend([word] * weight)
    except ValueError:
        continue

# Pad or trim to exactly 50,000 words
if len(weighted_words) < TOTAL_WORDS:
    repeats = (TOTAL_WORDS // len(weighted_words)) + 1
    weighted_words *= repeats

random.shuffle(weighted_words)
weighted_words = weighted_words[:TOTAL_WORDS]

# Write to JS file
with open("weightedWords.js", "w", encoding="utf-8") as f:
    f.write(f"export const weightedWords = {json.dumps(weighted_words)};")

print("✅ Done. File 'weightedWords.js' created with", len(weighted_words), "words.")
