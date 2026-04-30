import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Editor2 from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import { api_base_url } from '../helper';
import { toast } from 'react-toastify';

const Editor = () => {
  const [code, setCode] = useState(""); // State to hold the code
  const { id } = useParams(); // Extract project ID from URL params
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);

  const [data, setData] = useState(null);

  // Fetch project data on mount
  useEffect(() => {
    fetch(`${api_base_url}/projects/single`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        projectId: id,
      }),
    })
     // .then((res) => res.json())
     .then(async (res) => {
  const text = await res.text();
  console.log("RAW RESPONSE:", text);
  return JSON.parse(text);
})
      .then((data) => {
        if (data.success) {
          setCode(data.project.code); // Set the fetched code
          setData(data.project);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error('Error fetching project:', err);
        toast.error('Failed to load project.');
      });
  }, [id]);

  // Save project function
  const saveProject = () => {
    const trimmedCode = code?.toString().trim(); // Ensure code is a string and trimmed
    console.log('Saving code:', trimmedCode); // Debug log

    fetch(`${api_base_url}/projects/save`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        projectId: id,
        code: trimmedCode, // Use the latest code state
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.msg);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error('Error saving project:', err);
        toast.error('Failed to save the project.');
      });
  };

  // Shortcut handler for saving with Ctrl+S
  const handleSaveShortcut = (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault(); // Prevent browser's default save behavior
      saveProject(); // Call the save function
    }
  };

  // Add and clean up keyboard event listener
useEffect(() => {
  window.addEventListener('keydown', handleSaveShortcut);
  return () => {
    window.removeEventListener('keydown', handleSaveShortcut);
  };
}, []);

const runProject = () => {
  fetch(`${api_base_url}/execute/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      code: code,
      language: data.projectLanguage
    })
  })
    .then(res => res.json())
    .then(resData => {
      console.log(resData);

      if (resData.success) {
        setOutput(resData.output);
        setError(false);
      } else {
        setOutput(resData.msg);
        setError(true);
      }
    })
    .catch(err => {
      console.error(err);
      setOutput("Execution failed");
      setError(true);
    });
};

  // return (
  //   <>
  //     <Navbar />
  //     <div className="flex items-center justify-between" style={{ height: 'calc(100vh - 90px)' }}>
  //       <div className="left w-[50%] h-full">
  //         <Editor2
  //           onChange={(newCode) => {
  //             console.log('New Code:', newCode); // Debug: Log changes
  //             setCode(newCode || ''); // Update state
  //           }}
  //           theme="vs-dark"
  //           height="100%"
  //           width="100%"
  //           language={data?.projectLanguage || "python"}
  //           value={code} // Bind editor to state
  //         />
  //       </div>
  //       <div className="right p-3.75 w-[50%] h-full bg-[#27272a]">
  //         <div className="flex pb-3 border-b border-b-[#1e1e1f] items-center justify-between px-7.5">
  //           <p className="p-0 m-0">Output</p>
  //           <button
  //             className="btnNormal w-fit! px-5! bg-blue-500 transition-all hover:bg-blue-600"
  //             onClick={runProject} // Save when clicking the button
  //           >
  //             run
  //           </button>

  //         </div>
  //           <pre className={`w-full h-[75vh] ${error ? "text-red-500" : ""}`} style={{textWrap: "nowrap"}}>{output}</pre>
  //       </div>
  //     </div>
  //   </>
  // );
return (
  <>
    <Navbar />

    <div className="flex flex-col md:flex-row h-[calc(100vh-90px)]">

      {/* LEFT: EDITOR */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full">
        <Editor2
          onChange={(newCode) => setCode(newCode || "")}
          theme="vs-dark"
          height="100%"
          width="100%"
          language={data?.projectLanguage || "python"}
          value={code}
        />
      </div>

      {/* RIGHT: OUTPUT */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full bg-[#27272a] flex flex-col">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-center justify-between p-4 border-b border-[#1e1e1f]">

          <p className="text-lg">Output</p>

          <div className="flex gap-3">
            <button
              onClick={saveProject}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded"
            >
              Save
            </button>

            <button
              onClick={runProject}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
              disabled={!data} // prevent crash
            >
              Run
            </button>
          </div>

        </div>

        {/* OUTPUT AREA */}
        <div className="flex-1 overflow-auto p-4">
          <pre
            className={`whitespace-pre-wrap wrap-break-word ${
              error ? "text-red-500" : "text-green-400"
            }`}
          >
            {output || "Click Run to see output..."}
          </pre>
        </div>

      </div>
    </div>
  </>
);
};

export default Editor;