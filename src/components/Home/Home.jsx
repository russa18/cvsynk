import { useState } from "react";
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
    setSelectedJob(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Save the file name to display
    }
  };

  return (
    <div className="home max-w-screen-xl m-auto py-4 px-[1rem]">
      <div className="grid sm:grid-cols-2 gap-4">
        {jobData.map((job, index) => (
          <div
            key={index}
            className="job-list border-2 p-4 grid grid-cols-5 gap-4"
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
            className="modal-content bg-white p-6 rounded-md max-h-[90vh] overflow-y-auto text-gray-800 relative w-[95%] sm:w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button text-red-500 text-2xl font-bold  transition-transform leading-none absolute top-1 right-1"
              onClick={closeApplyJob}
            >
              &times;
            </button>

            <div className="application-form">
              <div className="text-center">
                <p>Applicaton for the role of</p>
                <p>
                  {selectedJob.title} | {selectedJob.company} |{" "}
                  {selectedJob.location}
                </p>
              </div>

              <form className="flex flex-col ">
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-2 mt-4 outline-1 outline rounded-md outline-gray-300"
                />
                <input
                  type="text"
                  placeholder="name"
                  className="px-4 py-2 mt-4 outline-1 outline rounded-md outline-gray-300"
                />
                <div className="file-upload-container flex flex-col w-[fit-content] my-4">
                  <label
                    htmlFor="file-upload"
                    className="px-6 py-2 bg-blue-400 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-600 transition"
                  >
                    Upload Resume
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
                </div>

                <button
                  type="submit"
                  className="transition ease-in-out delay-150 bg-gradient-to-r from-teal-400 to-blue-500 p-4 rounded-md   hover:scale-[1.01] text-white hover:from-blue-500 hover:to-teal-400 duration-300 shadow-xl"
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
