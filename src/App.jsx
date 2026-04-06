import { useState, useEffect, use } from 'react'
import './App.css'
import JobCard from './jobcard';

const initialJobs = [
  { id: 1, companyName: "TechNova UK", role: "Frontend Developer", salary: 75000, status: "Applied" },
  { id: 2, companyName: "Maple Leaf Software", role: "React Engineer", salary: 85000, status: "Interviewing" },
  { id: 3, companyName: "Aussie Web Co", role: "UI Developer", salary: 65000, status: "Rejected" },
  { id: 4, companyName: "Berlin Startups", role: "Frontend Engineer", salary: 90000, status: "Offer" },
  { id: 5, companyName: "Kiwi Remote", role: "Web Developer", salary: 70000, status: "Interviewing" }
];


function App() {
   const [jobs, setJobs] = useState(() => {
    
    const savedData = localStorage.getItem('jobdata');
    
    if (savedData) {
      return JSON.parse(savedData);
    }
    
    return initialJobs;
  });
   const [companyName, setCompanyName] = useState("")
   const [role, setRole] = useState("")
   const [salary, setSalary] = useState("")
   const [statusFilter, setStatusFilter] = useState("Applied")
   const [searchValue, setSearchValue] = useState("")
   const [searchFilter, setSearchFilter] = useState("All")
   const [formError, setFormError] = useState(false)

  //  useEffect(() => {
  //   function checkData(){
  //     const data = localStorage.getItem('jobdata')
  //     if(data){
  //       setJobs(JSON.parse(data))
  //     }
  //   }
    
  //   checkData()

  //  },[])

 useEffect(() => {
  function saveData(){
    localStorage.setItem('jobdata', JSON.stringify(jobs))
  }

  saveData()
 }, [jobs])

 //handle add job
 function handleSubmit(e){
  e.preventDefault()

  if(!companyName || !role || !salary || isNaN(salary) || Number(salary) <= 0 || !statusFilter){
    // alert("please fill in the companyName and role and salary and pick a status")
    setFormError(true)
    return
  }

  const data = {
    id : Date.now(),
    companyName : companyName,
    role : role,
    salary : Number(salary),
    status : statusFilter
  }
   
  setJobs((prev) => [...prev, data])

  setCompanyName("")
  setRole("")
  setSalary("")
  setStatusFilter("Applied")
  setFormError(false)
 }

  //Total appplications for jobs
  const totalJob = jobs.length
  console.log(totalJob)
 
  //Current interviewing
  const interviewingJob = jobs.filter((job) => (
    job.status === 'Interviewing'
  ))
   const currentInterviewingJob = interviewingJob.length
  
   //logic for search/selecting

   const searchJobs = jobs.filter((job) => {
    const correctSearch =  job.companyName.toLowerCase().includes(searchValue.toLowerCase())

    const correctStatus = searchFilter === "All" || searchFilter === job.status

     return correctSearch && correctStatus
   })

   // logic to delete job
   function deleteJob(selected){
    setJobs( (prev) => (
      prev.filter((job) => (
        job.id !== selected
      ))
    ))
   }



  return (
    <>
     <h1 style={{textAlign : 'center'}}>Job Tracker</h1>
      <div className='form-div'>

     <form onSubmit={handleSubmit}>
      <label>Company Name : </label>
      <input type="text" id='company-name' placeholder='company name' value={companyName} onChange={(e) => setCompanyName(e.target.value)}/> <br />
       <label>Role : </label>
      <input type="text" id='role' placeholder='role' value={role} onChange={(e) => setRole(e.target.value)}/><br />
       <label>Salary : </label>
      <input type="text" id='salary' placeholder='salary' value={salary} onChange={(e) => setSalary(e.target.value)}/><br />
       <label>Current Status : </label>
      <select id='status' value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="Applied">Applied</option>
        <option value='Interviewing'>Interviewing</option>
        <option value='Rejected'>Rejected</option>
        <option value='Offer'>Offer</option>
      </select>
       <br />
         { formError && <p id='error'>Please fill in the companyName and role and salary and pick a status</p> }
      <button id='submit-button' type='submit'>Add Job</button>
     </form>

    </div>
        
        <div className='search-div'>
           <label>Search Panel : </label>
          <input type="text" id='search' placeholder='type to search' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} /> 
          <select id="status" value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)}>
               <option value="All">All</option>
               <option value="Applied">Applied</option>
               <option value='Interviewing'>Interviewing</option>
               <option value='Rejected'>Rejected</option>
               <option value='Offer'>Offer</option>
          </select>
        </div>

         <div>
          <h1 id='total'>Total Applications : {totalJob}</h1>
          <p id='current'>Current Interviewing : {currentInterviewingJob}</p>
         </div>

         <div className='job-card'>
          {
          searchJobs.map((job) => (
            <div id='card' key={job.id}>
               <JobCard companyName={job.companyName} role={job.role} salary={job.salary} status={job.status} />
               <button id='delete-button' onClick={() => deleteJob(job.id)} >Delete Job</button>
            </div>
          ))
        }
         </div>
        
    </>
  )
}

export default App
