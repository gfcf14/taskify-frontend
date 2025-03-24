# Taskify Frontend

This repository is the frontend part of my Taskify project.

## Description
The Taskify project represents a simple web application which supports authentication, project creation, and creation of different tasks assigned to a project, both able to be modified to indicate status of completion (To do, Active, Review, and Complete).

## Purpose

The idea I had through making this project was to demonstrate the basic CRUD operations along with basic user authorization, as prepared via a React application supported by Vite.

## Installation
If you're pulling this repo, all you'll need to do is run the following:

```sh
npm i
```
After this, to run the app you'll need to run the following:
```sh
npm run dev
```
Ensure that you have a working host to connect to, as described in the **.env.sample**. Create a **.env** file with the host specified in **VITE_BE_HOST**. Given that this frontend repo has been created to work alongside a backend counterpart, it would be a good idea to pull this repo as well https://github.com/gfcf14/taskify-backend and run it before attempting to run this one.

## Application Flow
![enter image description here](https://github.com/gfcf14/taskify-frontend/blob/main/taskify_flowchart.png?raw=true)

The application flow is simpler than displayed. In the beginning the user authentication token is checked. If not valid (whether expired or nonexistent) the user is directed to the login page. Upon successful login, the user is directed to the **/dashboard** page, which in the backend fetches all existing projects from **/api/projects/**, if any exist. When clicking on any existing project the user is taken to the project page, where tasks by project are fetched by hitting the **/projects/:id** endpoint. When creating, updating, or deleting any of the new or existing projects the list in which they are displayed is updated to show changes. Lastly, for any of these changes the token is checked, and if it is found to be expired, the user is directed to the login page again to obtained a new token.

## Features

The app's routes are very simple for the frontend side:
```vite
<BrowserRouter>
	<Routes>
		<Route path='/' element={<Login />}></Route>
		<Route path='/dashboard' element={<Dashboard />}></Route>
		<Route path='/projects/:id' element={<Tasks />}></Route>
	</Routes>
</BrowserRouter>
```

- **Basic authentication:** When the user navigates to **/** a simple login form will be available to log in. Upon entering the correct credentials, they will be directed to **/dashboard**.
- **Database record read:** Records are fetched on two routes: **/dashboard** and **/projects/:id**. In **/dashboard** all projects are fetched, each of which (if any) will link to **/projects/:id** when clicked. It is on this page that tasks are fetched, by project id. To avoid overcomplicating the codebase this is achieved via a generic **List** component which shows either project or task data and can call the endpoint of each as specified:
```vite
const  Dashboard  = () => {
	return (
		<List
			endpoint='api/projects/'
			title='Projects'
			type='project'
		/>
	);
}
```
```vite
export  default  function  Tasks() {
	const { id } =  useParams();
	const [ searchParams ] =  useSearchParams();  

	return (
		<>
			<Link to='/dashboard' className='absolute top-2 left-2'>{`< Dashboard`}</Link>
			<List
				endpoint={`api/projects/${id}`}
				id={id as unknown as number}
				title={`Project: ${searchParams.get('name')}`}
				type='task'
			/>
		</>
	);
}
```

- **Database record creation:** For both of the **/dashboard** and **/projects/:id** pages it's possible to open a **Modal** component to create a project/task, containing a form to indicate title and description. Once the form is submitted, a **POST** request is made to the backend to create the record, after which the modal is closed and the call to fetch projects/tasks is invoked again, so the new record shows up in the list.
- **Database record update:** Each record (project or task) will have an action on the top right to **EDIT**, such that when pressed the same modal opens but now with the ability to edit the existing data, thus the form will be prepopulated, along with a dropdown to indicate status to edit the record's existing status (To do, Active, Review, or Complete). When submitted, the same endpoint is called, but this time as a **PATCH** request, as the function to perform this adapts to the state in which the modal opens and form is submitted:
```vite
const  handleSubmit  =  async (e: FormEvent<HTMLFormElement>) => {
	e.preventDefault(); 

	const  requestBody  =  isEditing  ? {
		description,
		id,
		status,
		...(type  ===  'project'  ? { name } : { title: name })
	} :  type  ===  'project'  ? {
		name, description, status: 0
	} :  type  ===  'task'  ? {
		description,
		project: projectId,
		status: 0,
		title: name
	} : {};  

	await  fetch(`${import.meta.env.VITE_BE_HOST}api/${type}s/${isEditing  ?  id  :  ''}`, {
		method: isEditing  ?  'PATCH'  :  'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(requestBody),
	});  

	onClose();
	refetch();
}
```
- **Database record deletion:** There is also a **DELETE** button at the top right, with a similar functionality, but instead calling a **DELETE** request which disposes of the record. In the case of a task, that single task is deleted, but in the case of a project, all tasks associated with that project get deleted as well:
```vite
const  handleDelete  =  async(id: number) => {
	try {
		await  axios.delete(`${import.meta.env.VITE_BE_HOST}api/${type}s/${id}`, {
			headers: { Authorization: `Bearer ${token}`},
		});  

		fetchData();
	} catch (error) {
		console.error(`Error deleting item: ${error}`);
	}
};
```
