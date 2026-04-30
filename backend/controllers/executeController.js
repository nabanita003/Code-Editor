const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

exports.executeCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        msg: "Code and language required"
      });
    }

    // Create temp folder if not exists
    const dir = path.join(__dirname, "../temp");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    let filePath = "";
    let command = "";

    // ================= LANGUAGE HANDLING =================

    if (language === "python") {
      filePath = path.join(dir, "code.py");
      fs.writeFileSync(filePath, code);
      command = `python "${filePath}"`;
    }

    else if (language === "javascript") {
      filePath = path.join(dir, "code.js");
      fs.writeFileSync(filePath, code);
      command = `node "${filePath}"`;
    }

    else if (language === "c") {
      filePath = path.join(dir, "code.c");
      const exePath = path.join(dir, "code.exe");

      fs.writeFileSync(filePath, code);
      command = `gcc "${filePath}" -o "${exePath}" && "${exePath}"`;
    }

    else if (language === "cpp") {
      filePath = path.join(dir, "code.cpp");
      const exePath = path.join(dir, "code.exe");

      fs.writeFileSync(filePath, code);
      command = `g++ "${filePath}" -o "${exePath}" && "${exePath}"`;
    }

    else if (language === "java") {
      filePath = path.join(dir, "Main.java");
      fs.writeFileSync(filePath, code);
      command = `javac "${filePath}" && java -cp "${dir}" Main`;
    }

    else {
      return res.status(400).json({
        success: false,
        msg: "Unsupported language"
      });
    }

    // ================= EXECUTE =================
    exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
      if (error) {
        return res.json({
          success: true,
          output: stderr || error.message
        });
      }

      return res.json({
        success: true,
        output: stdout || "No Output"
      });
    });

  } catch (err) {
    console.error("EXEC ERROR:", err);
    res.status(500).json({
      success: false,
      msg: err.message
    });
  }
};