


function JobCard({companyName, role, salary, status}){
     const convert = new Intl.NumberFormat('en-ng', {
        style : 'currency',
        currency : 'NGN'
     }).format(salary)

    return(
        <>
         <h1>Company Name : {companyName}</h1>
         <p>Role : {role}</p>
         <p>Salary : {convert}</p>
         <p>Status : {status}</p>
        </>
    )
}


export default JobCard