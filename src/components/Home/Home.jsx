import { useState, useEffect } from "react";
import {
  MdOutlineLocationOn,
  MdOutlineCurrencyRupee,
  MdOutlineDescription,
} from "react-icons/md";

import jobData from "../../data/jobData";
export default function Home() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isApplyJobOpen, setIsApplyJobOpen] = useState(false);
  const [fileName, setFileName] = useState(null);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
    setSelectedJob(null);
  };

  const handleApplyJob = (job) => {
    setSelectedJob(job);
    setIsApplyJobOpen(true);
  };

  const closeApplyJob = () => {
    setIsApplyJobOpen(!isApplyJobOpen);
    // setSelectedJob(null);
  };

  useEffect(() => {
    if (isModalOpen || isApplyJobOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen, isApplyJobOpen]);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!value) {
      setErrors((prev) => ({ ...prev, email: "Email is required." }));
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format." }));
    } else {
      setErrors((prev) => ({ ...prev, email: null }));
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    if (!value) {
      setErrors((prev) => ({ ...prev, name: "Name is required." }));
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        name: "Name must only contain alphabets.",
      }));
    } else if (value.length < 3) {
      setErrors((prev) => ({
        ...prev,
        name: "Name must be at least 3 characters.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, name: null }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        setFileName(file.name);
        setErrors((prev) => ({ ...prev, file: null }));
      } else {
        setErrors((prev) => ({
          ...prev,
          file: "Only PDF files are allowed.",
        }));
        event.target.value = "";
      }
    } else {
      setErrors((prev) => ({ ...prev, file: "Resume (PDF) is required." }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormValid = !errors.email && !errors.name && !errors.file;
    const isInputFilled = fileName && name && email;
    if (isFormValid && isInputFilled) {
      console.log({
        email,
        name,
        fileName,
      });
      alert("Form submitted successfully!");
      setIsApplyJobOpen(false);
      setIsModalOpen(false);

      setEmail("");
      setName("");
      setFileName(null);
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  return (
    <div className="home max-w-screen-xl m-auto py-4 px-[1rem] mt-20">
      <div className="grid sm:grid-cols-2 gap-4">
        {jobData.map((job, index) => (
          <div
            key={index}
            className="job-list border-2 p-4 grid grid-cols-5 gap-4 hover:shadow-md"
          >
            <div>
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="w-20 h-20 object-contain m-auto"
              />
            </div>

            <div className="col-span-4">
              <h3 className="font-bold">{job.title}</h3>
              <p className="text-gray-800 font-semibold">{job.company}</p>
              <p className="text-gray-800 mt-2 flex items-center my-1">
                <MdOutlineLocationOn className="mr-3 w-4 h-4" />
                {job.location}
              </p>
              <p className="text-gray-800 flex items-center my-1">
                <MdOutlineCurrencyRupee className="mr-3 w-4 h-4" />
                {job.salary}
              </p>

              <p className="text-sm text-gray-800 flex items-center my-1">
                <MdOutlineDescription className="mr-3 w-4 h-4" />
                {job.description}
              </p>

              <button
                className="view-details-button bg-blue-500 text-white px-4 py-2 rounded mt-3"
                onClick={() => handleViewDetails(job)}
              >
                <span className="text">View Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedJob && (
        <div
          className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="modal-content bg-white p-6 rounded-md max-h-[90vh] overflow-y-auto text-gray-800 w-[95%] sm:w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button text-red-500 float-right text-2xl font-bold hover:rotate-90 transition-transform leading-none"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={selectedJob.logo}
              alt={`${selectedJob.company} logo`}
              className="w-24 h-24 object-contain mx-auto mb-4"
            />
            <h3 className="font-bold text-lg text-center">
              {selectedJob.title}
            </h3>
            <p className=" font-semibold text-center">
              {selectedJob.company} | {selectedJob.location}
            </p>

            <div className="text-sm my-2">
              <p className="font-semibold">Job Description</p>
              <ul>
                <li>- {selectedJob.description}</li>
                <li>- {selectedJob.biggerDescription}</li>
              </ul>
            </div>
            <div className="text-sm my-2">
              <p className="font-semibold">Responsibilities</p>
              <ul>
                {selectedJob.responsibilities.map((res, index) => (
                  <li key={index}>- {res}</li>
                ))}
              </ul>
            </div>

            <div className="text-sm  my-2">
              <p className="font-semibold">Company details</p>
              <p>{selectedJob.companyDetails}</p>
            </div>
            <div className="text-sm my-2">
              <p className="font-semibold">Qualifications</p>
              <ul>
                {selectedJob.qualifications.map((qual, index) => (
                  <li key={index}>- {qual}</li>
                ))}
              </ul>
            </div>

            <div className="text-smmy-2">
              <p className="font-semibold">Skills required</p>
              <ul>
                {selectedJob.skillsRequired.map((skill, index) => (
                  <span key={index}> {skill} ,</span>
                ))}
              </ul>
            </div>

            <div className="text-sm my-2">
              <p className="font-semibold">Additional requirements</p>
              <ul>
                {selectedJob.additionalRequirements.map((additional, index) => (
                  <li key={index}>- {additional}</li>
                ))}
              </ul>
            </div>
            <p className=" flex items-center my-2 text-sm">
              <MdOutlineCurrencyRupee className="mr-3 w-5 h-5" />
              {selectedJob.salary}
            </p>
            <button
              className="apply-btn type1 "
              onClick={() => handleApplyJob(selectedJob)}
            ></button>
          </div>
        </div>
      )}

      {isApplyJobOpen && selectedJob && (
        <div
          className="modal fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
          onClick={() => setIsApplyJobOpen(false)}
        >
          <div
            className="modal-content bg-white pt-10 p-6 rounded-md max-h-[90vh] overflow-y-auto text-gray-800 relative w-[95%] sm:w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button text-red-500 text-2xl font-bold  transition-transform leading-none absolute top-1 right-5"
              onClick={closeApplyJob}
            >
              &times;
            </button>

            <div className="application-form">
              <div className="text-center">
                <p>Application for the role of</p>
                <p>
                  {selectedJob.title} | {selectedJob.company} |{" "}
                  {selectedJob.location}
                </p>
              </div>

              <form className="flex flex-col " onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`px-4 py-2 mt-4 outline-1 outline rounded-md outline-gray-300 ${
                    errors.email ? "outline-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
                <input
                  type="text"
                  value={name}
                  placeholder="Full name"
                  onChange={handleNameChange}
                  className={`px-4 py-2 mt-4 outline-1 outline rounded-md outline-gray-300 ${
                    errors.name ? "outline-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
                <div className="file-upload-container flex flex-col w-[fit-content] my-4">
                  <label
                    htmlFor="file-upload"
                    className={`px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-600 transition ${
                      fileName ? "bg-blue-600" : ""
                    }`}
                  >
                    <span className={`${fileName ? "" : "animate-pulse"} `}>
                      Upload Resume (.pdf)
                    </span>
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {fileName && (
                    <p className="text-sm text-gray-700 mt-2">
                      File Uploaded:{" "}
                      <span className="font-semibold">{fileName}</span>
                    </p>
                  )}
                  {errors.file && (
                    <p className="text-red-500 text-sm mt-1">{errors.file}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={
                    !email ||
                    !name ||
                    !fileName ||
                    errors.email ||
                    errors.name ||
                    errors.file
                  }
                  className={`transition ease-in-out delay-150 bg-gradient-to-r py-2 rounded-md text-white duration-300 shadow-xl text-lg ${
                    !email ||
                    !name ||
                    !fileName ||
                    errors.email ||
                    errors.name ||
                    errors.file
                      ? "from-blue-200 to-blue-300 cursor-not-allowed"
                      : "from-teal-400 to-blue-500 hover:scale-[1.01] hover:from-blue-500 hover:to-teal-400"
                  }`}
                  title={
                    !email ||
                    !name ||
                    !fileName ||
                    errors.email ||
                    errors.name ||
                    errors.file
                      ? "Please fill out all fields correctly before submitting."
                      : ""
                  }
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
