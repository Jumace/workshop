import { exec } from "child_process";
import fs from "fs";
import path from "path";

// 1. Run cspell (implicitly uses the local cspell.json settings)
const cmd = "npx cspell --words-only --unique --no-summary --no-progress";

exec(cmd, (error, stdout) => {
  const newWords = stdout
    .split("\n")
    .map((w) => w.trim())
    .filter(Boolean);

  // 2. Fast exit if no unknown words are found
  if (newWords.length === 0) {
    console.log("✅ No new unknown words found.");
    return;
  }

  // 3. Resolve path and read config only when modifications are needed
  const configFile = path.resolve("cspell.json");
  let config = { words: [] };

  if (fs.existsSync(configFile)) {
    try {
      config = JSON.parse(fs.readFileSync(configFile, "utf8"));
    } catch (e) {
      console.error("❌ Failed to parse existing cspell.json:", e.message);
      process.exit(1);
    }
  }

  if (!config.words) config.words = [];

  // 4. Merge, deduplicate, and sort words
  const totalWords = [...new Set([...config.words, ...newWords])].sort();
  const addedCount = totalWords.length - config.words.length;

  if (addedCount === 0) {
    console.log("ℹ️ All unknown words are already in cspell.json.");
    return;
  }

  // 5. Save the updated configuration
  config.words = totalWords;
  fs.writeFileSync(configFile, JSON.stringify(config, null, 2), "utf8");

  console.log(`✨ Successfully added ${addedCount} new words to cspell.json!`);
});
