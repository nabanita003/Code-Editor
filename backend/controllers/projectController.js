// //controllers/projectController.js
// const Project = require("../models/Project"); // adjust path
// const jwt = require("jsonwebtoken");
// const secret = "3adf2bb9d8bf3362d03b24c8b20785b77b368500d6bf990825654bb6781ebf0c"; // replace with your actual secret
// const userModel = require("../models/User"); // adjust path

// // Helper function to generate startup code
// function getStartupCode(language) {
//   switch(language) {
//     case "python": return "# Start coding in Python\n";
//     case "java": return "public class Main {\n    public static void main(String[] args) {\n        // Start coding in Java\n    }\n}";
//     case "javascript": return "// Start coding in JavaScript\n";
//     case "cpp": return "#include <iostream>\nint main() {\n    // Start coding in C++\n    return 0;\n}";
//     case "c": return "#include <stdio.h>\nint main() {\n    // Start coding in C\n    return 0;\n}";
//     case "go": return "package main\nimport \"fmt\"\nfunc main() {\n    // Start coding in Go\n}";
//     default: return "";
//   }
// }

// exports.createProj = async (req, res) => {
//   try {
//     let { name, projectLanguage, token } = req.body;

//     let decoded = jwt.verify(token, secret);
//     let user = await userModel.findById(decoded.userId);

//     if (!user) {
//       return res.status(404).json({ success: false, msg: "User not found" });
//     }

//     let project = await Project.create({
//       name,
//       projectLanguage,
//       code: getStartupCode(projectLanguage),
//       createdBy: user._id
//     });

//     return res.status(200).json({
//       success: true,
//       msg: "Project created successfully",
//       projectId: project._id
//     });

//   } catch (error) {
//     return res.status(500).json({ success: false, msg: error.message });
//   }
// };

// exports.saveProject = async (req, res) => {
//   try {
//     let { token, projectId, code } = req.body;

//     let decoded = jwt.verify(token, secret);
//     let user = await userModel.findById(decoded.userId);

//     if (!user) {
//       return res.status(404).json({ success: false, msg: "User not found" });
//     }

//     let project = await Project.findByIdAndUpdate(projectId, { code });

//     if (!project) {
//       return res.status(404).json({ success: false, msg: "Project not found" });
//     }

//     return res.status(200).json({ success: true, msg: "Project saved successfully" });

//   } catch (error) {
//     return res.status(500).json({ success: false, msg: error.message });
//   }
// };

// exports.getProjects = async (req, res) => {
//   try {
//     let { token } = req.body;

//     let decoded = jwt.verify(token, secret);
//     let user = await userModel.findById(decoded.userId);

//     if (!user) {
//       return res.status(404).json({ success: false, msg: "User not found" });
//     }

//     let projects = await Project.find({createdBy: user._id}); // no createdBy field in schema, fetch all

//     return res.status(200).json({
//       success: true,
//       msg: "Projects fetched successfully",
//       projects
//     });

//   } catch (error) {
//     return res.status(500).json({ success: false, msg: error.message });
//   }
// };

// exports.getProject = async (req, res) => {
//   try {
//     let { token, projectId } = req.body;

//     let decoded = jwt.verify(token, secret);
//     let user = await userModel.findById(decoded.userId);

//     if (!user) {
//       return res.status(404).json({ success: false, msg: "User not found" });
//     }

//     let project = await Project.findById(projectId);

//     if (!project) {
//       return res.status(404).json({ success: false, msg: "Project not found" });
//     }

//     return res.status(200).json({ success: true, msg: "Project fetched successfully", project });

//   } catch (error) {
//     return res.status(500).json({ success: false, msg: error.message });
//   }
// };

// exports.deleteProject = async (req, res) => {
//   try {
//     let { token, projectId } = req.body;

//     let decoded = jwt.verify(token, secret);
//     let user = await userModel.findById(decoded.userId);

//     if (!user) {
//       return res.status(404).json({ success: false, msg: "User not found" });
//     }

//     let project = await Project.findByIdAndDelete(projectId);

//     if (!project) {
//       return res.status(404).json({ success: false, msg: "Project not found" });
//     }

//     return res.status(200).json({ success: true, msg: "Project deleted successfully" });

//   } catch (error) {
//     return res.status(500).json({ success: false, msg: error.message });
//   }
// };

// exports.editProject = async (req, res) => {
//   try {
//     let { token, projectId, name } = req.body;

//     let decoded = jwt.verify(token, secret);
//     let user = await userModel.findById(decoded.userId);

//     if (!user) {
//       return res.status(404).json({ success: false, msg: "User not found" });
//     }

//     let project = await Project.findById(projectId);
//     if (!project) {
//       return res.status(404).json({ success: false, msg: "Project not found" });
//     }

//     project.name = name;
//     await project.save();

//     return res.status(200).json({ success: true, msg: "Project edited successfully" });

//   } catch (error) {
//     return res.status(500).json({ success: false, msg: error.message });
//   }
// };


const Project = require("../models/Project");
const jwt = require("jsonwebtoken");
const userModel = require("../models/User");

const JWT_SECRET = "3adf2bb9d8bf3362d03b24c8b20785b77b368500d6bf990825654bb6781ebf0c";

// ================= HELPER: STARTER CODE =================
const getStartupCode = (language) => {
  switch (language) {
    case "python":
      return "# Start coding in Python\n";

    case "java":
      return `public class Main {
    public static void main(String[] args) {
        // Start coding in Java
    }
}`;

    case "javascript":
      return "// Start coding in JavaScript\n";

    case "cpp":
      return `#include <iostream>
using namespace std;

int main() {
    // Start coding in C++
    return 0;
}`;

    case "c":
      return `#include <stdio.h>

int main() {
    // Start coding in C
    return 0;
}`;

    case "go":
      return `package main
import "fmt"

func main() {
    // Start coding in Go
}`;

    default:
      return "";
  }
};

// ================= HELPER: VERIFY TOKEN =================
const verifyUser = async (token) => {
  if (!token) throw new Error("No token provided");

  const decoded = jwt.verify(token, JWT_SECRET);
  const user = await userModel.findById(decoded.userId);

  if (!user) throw new Error("User not found");

  return user;
};

// ================= CREATE PROJECT =================
exports.createProj = async (req, res) => {
  try {
    const { name, projectLanguage, token } = req.body;

    if (!name || !projectLanguage) {
      return res.status(400).json({
        success: false,
        msg: "Name and language are required",
      });
    }

    const user = await verifyUser(token);

    const project = await Project.create({
      name,
      projectLanguage,
      code: getStartupCode(projectLanguage),
      createdBy: user._id,
    });

    return res.status(200).json({
      success: true,
      msg: "Project created successfully",
      projectId: project._id,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error.message);
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

// ================= GET ALL PROJECTS =================
exports.getProjects = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await verifyUser(token);

    const projects = await Project.find({ createdBy: user._id }).sort({
      date: -1,
    });

    return res.status(200).json({
      success: true,
      msg: "Projects fetched successfully",
      projects,
    });
  } catch (error) {
    console.error("GET ALL ERROR:", error.message);
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

// ================= GET SINGLE PROJECT =================
exports.getProject = async (req, res) => {
  try {
    const { token, projectId } = req.body;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        msg: "Project ID is required",
      });
    }

    const user = await verifyUser(token);

    const project = await Project.findOne({
      _id: projectId,
      createdBy: user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        msg: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Project fetched successfully",
      project,
    });
  } catch (error) {
    console.error("GET SINGLE ERROR:", error.message);
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

// ================= SAVE PROJECT =================
exports.saveProject = async (req, res) => {
  try {
    const { token, projectId, code } = req.body;

    if (!projectId) {
      return res.status(400).json({
        success: false,
        msg: "Project ID is required",
      });
    }

    const user = await verifyUser(token);

    const project = await Project.findOneAndUpdate(
      { _id: projectId, createdBy: user._id },
      { code },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        msg: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Project saved successfully",
    });
  } catch (error) {
    console.error("SAVE ERROR:", error.message);
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

// ================= DELETE PROJECT =================
exports.deleteProject = async (req, res) => {
  try {
    const { token, projectId } = req.body;

    const user = await verifyUser(token);

    const project = await Project.findOneAndDelete({
      _id: projectId,
      createdBy: user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        msg: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Project deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error.message);
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

// ================= EDIT PROJECT =================
exports.editProject = async (req, res) => {
  try {
    const { token, projectId, name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        msg: "Project name is required",
      });
    }

    const user = await verifyUser(token);

    const project = await Project.findOneAndUpdate(
      { _id: projectId, createdBy: user._id },
      { name },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        msg: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Project updated successfully",
    });
  } catch (error) {
    console.error("EDIT ERROR:", error.message);
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};