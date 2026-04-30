import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Select from 'react-select';
import { api_base_url } from '../helper';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import  clogo from "../assets/C_Logo.png";
import  javaaLogo from "../assets/Javaa.png"
import pythonLogo from "../assets/Python.png"
import jsLogo from "../assets/javascript.jpg"
import cppLogo from "../assets/Cpp.png"

const languageIcons = {
  python: pythonLogo,
  javascript: jsLogo,
  c: clogo,
  cpp: cppLogo,
  java: javaaLogo,
};
const Home = () => {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [search, setSearch] = useState("");
  const [filterLang, setFilterLang] = useState("all");
  const [isEditModelShow, setIsEditModelShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#000',
      borderColor: '#555',
      color: '#fff',
      padding: '5px',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#000',
      color: '#fff',
      width: "100%"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#333' : '#000',
      color: '#fff',
      cursor: 'pointer',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#aaa',
    }),
  };

  const getRunTimes = async () => {
    let res = await fetch("https://emkc.org/api/v2/piston/runtimes");
    let data = await res.json();

    const filteredLanguages = ["python", "javascript", "c", "c++", "java", "bash"];

    const options = data
      .filter(runtime => filteredLanguages.includes(runtime.language))
      .map(runtime => ({
        label: `${runtime.language} (${runtime.version})`,
        value: runtime.language === "c++" ? "cpp" : runtime.language,
        version: runtime.version,
      }));

    setLanguageOptions(options);
  };

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
  };

  const [projects, setProjects] = useState(null);

  const getProjects = async () => {
    setLoading(true);
    fetch(api_base_url + "/projects/all", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: localStorage.getItem("token")
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProjects(data.projects);
        } else {
          toast.error(data.msg);
        }
        setLoading(false);
      });
  };

useEffect(() => {
  (async () => {
    try {
      await getProjects();
      await getRunTimes();
    } catch (err) {
      console.error(err);
    }
  })();
}, []);

  //  FIX: prevent crash
  const createProj = () => {
    if (!selectedLanguage) {
      toast.error("Please select a language");
      return;
    }

    fetch(api_base_url + "/projects/create", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        projectLanguage: selectedLanguage.value,
        token: localStorage.getItem("token"),
        // version: selectedLanguage.version
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setName("");
          navigate("/editor/" + data.projectId);
        } else {
          toast.error(data.msg);
        }
      });
  };

  const deleteProject = (id) => {
    let conf = confirm("Are you sure you want to delete this project?");
    if (conf) {
      fetch(api_base_url + "/projects/delete", {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: id,
          token: localStorage.getItem("token")
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            getProjects();
          } else {
            toast.error(data.msg);
          }
        });
    }
  };

  const [editProjId, setEditProjId] = useState("");

  const updateProj = () => {
    fetch(api_base_url + "/projects/edit", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectId: editProjId,
        token: localStorage.getItem("token"),
        name: name,
      })
    })
      .then(res => res.json())
      .then(data => {
        setIsEditModelShow(false);
        setName("");
        setEditProjId("");
        getProjects();

        if (!data.success) {
          toast.error(data.msg);
        }
      });
  };

  const filteredProjects = projects
  ?.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )
  ?.filter(p =>
    filterLang === "all" ? true : p.projectLanguage === filterLang
  );

  return (
    <>
      <Navbar />

  <div className="flex items-center px-25 justify-between mt-5"> <h3 className='text-2xl'>👋 Hi, Folks!</h3> <div className="flex items-center"> <button onClick={() => setIsCreateModelShow(true)} className="btnNormal bg-blue-500 transition-all hover:bg-blue-600" > Create Project </button> </div> </div>
  <div className="flex flex-col md:flex-row gap-3 px-4 md:px-25 mt-5">

  <input
    type="text"
    placeholder="Search projects..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full md:w-[60%] p-3 rounded bg-[#1a1a1a] text-white"
  />

  <select
    value={filterLang}
    onChange={(e) => setFilterLang(e.target.value)}
    className="w-full md:w-[50%] p-3 rounded bg-[#1a1a1a] text-white"
  >
    <option value="all">All Languages</option>
    <option value="python">Python</option>
    <option value="javascript">JavaScript</option>
    <option value="c">C</option>
    <option value="cpp">C++</option>
    <option value="java">Java</option>
  </select>

</div>

      {/* <div className="projects px-5 lg:px-25 sm:px-5 mt-5 pb-10">

        {
  !projects || projects.length === 0 ? (
    <p className="text-gray-400">No Project Found !</p>
  ) : filteredProjects && filteredProjects.length > 0 ? (
    filteredProjects.map((project, index) => (
      <div key={index} className="project w-full p-3.75 flex items-center justify-between bg-[#0f0e0e]">

        <div
          onClick={() => navigate("/editor/" + project._id)}
          className='flex w-full items-center gap-3.75'
        >
          <img
            src={languageIcons[project.projectLanguage]}
            alt="logo"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h3 className='text-xl'>{project.name}</h3>
            <p className='text-[14px] text-[gray]'>
              {new Date(project.date).toDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.75">
          <button
            className="btnNormal bg-blue-500 hover:bg-blue-600"
            onClick={() => {
              setIsEditModelShow(true);
              setEditProjId(project._id);
              setName(project.name);
            }}
          >
            Edit
          </button>

          <button
            onClick={() => deleteProject(project._id)}
            className="btnNormal bg-red-500 hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    ))
  ) : (
    <div className="flex items-center justify-center h-[50vh]">
  <p className="text-gray-400 text-lg">No matching projects found!</p>
</div>
  )
}
      </div> */}
      <div className="projects px-5 lg:px-25 sm:px-5 mt-5 pb-10">

  {loading ? (
    // 💀 SKELETON LOADING
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-[#1a1a1a] p-4 rounded-xl animate-pulse">
          <div className="h-5 bg-gray-600 mb-2 rounded"></div>
          <div className="h-4 bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>

  ) : !projects || projects.length === 0 ? (
    // ❌ NO PROJECTS
    <p className="text-gray-400">No Project Found!</p>

  ) : filteredProjects && filteredProjects.length > 0 ? (
    // ✅ PROJECT LIST
    filteredProjects.map((project, index) => (
      <div key={index} className="project w-full p-3.75 flex items-center justify-between bg-[#0f0e0e]">

        <div
          onClick={() => navigate("/editor/" + project._id)}
          className='flex w-full items-center gap-3.75 cursor-pointer'
        >
          <img
            src={languageIcons[project.projectLanguage]}
            alt="logo"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h3 className='text-xl'>{project.name}</h3>
            <p className='text-[14px] text-[gray]'>
              {new Date(project.date).toDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.75">
          <button
            className="btnNormal bg-blue-500 hover:bg-blue-600"
            onClick={() => {
              setIsEditModelShow(true);
              setEditProjId(project._id);
              setName(project.name);
            }}
          >
            Edit
          </button>

          <button
            onClick={() => deleteProject(project._id)}
            className="btnNormal bg-red-500 hover:bg-red-600"
          >
            Delete
          </button>
        </div>

      </div>
    ))

  ) : (
    //  FILTERED EMPTY
    <div className="flex items-center justify-center h-[50vh]">
      <p className="text-gray-400 text-lg">No matching projects found!</p>
    </div>
  )}

</div>

      {/* CREATE MODAL */}
      {isCreateModelShow && (
        <div
          onClick={(e) => {
            if (e.target.classList.contains("modelCon")) {
              setIsCreateModelShow(false);
              setName("");
            }
          }}
          className='modelCon flex items-center justify-center w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)]'
        >
          <div className="modelBox flex flex-col rounded-xl p-5 w-[90%] sm:w-100 bg-[#0F0E0E]">
            <h3 className='text-xl font-bold text-center'>Create Project</h3>

            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter your project name"
              className="w-full px-4 py-3 rounded-full bg-black text-white placeholder-gray-400 outline-none mt-3"
            />

            <div className='mt-4 p-1'>
              <Select
                placeholder="Select a Language"
                options={languageOptions}
                styles={customStyles}
                onChange={handleLanguageChange}
              />
            </div>

            {selectedLanguage && (
              <>
                <p className="text-[14px] text-green-500 mt-2">
                  Selected Language: {selectedLanguage.label}
                </p>
                <button onClick={createProj} className="btnNormal bg-blue-500 hover:bg-blue-600 mt-2">
                  Create
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditModelShow && (
        <div
          onClick={(e) => {
            if (e.target.classList.contains("modelCon")) {
              setIsEditModelShow(false);
              setName("");
            }
          }}
          className='modelCon flex items-center justify-center w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)]'
        >
          <div className="modelBox flex flex-col rounded-xl p-5 w-[90%] sm:w-100 bg-[#0F0E0E]">
            <h3 className='text-xl font-bold text-center'>Update Project</h3>

            {/* ✅ FIXED INPUT */}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your project name"
              className="w-full px-4 py-3 rounded-full bg-black text-white placeholder-gray-400 outline-none mt-3"
            />

            <button onClick={updateProj} className="btnNormal bg-blue-500 hover:bg-blue-600 mt-2">
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;