#Meanblog

A mean blog built with mean tools

##Application overview

As a goal, this application will provide basic blogging functionality using the MEAN stack. This includes front end theming capabilities, as well as back end editing and administration abilities. 

##Development goals
 
 - Learn more about the MEAN stack 
 - Use TDD through the entire client and server side development

##Feature list 
	
 - Front end
	 - Front end chronological display of blog posts
	 - Allow for custom theming of the front end
	 - Archive and tagging functionality (browse by date/month/tag)
	 - Search functionality
 - Back end
 	- Blog posts saved in local mongodb database
 	- Editing in markdown 
 	- Session/user support
 	- User roles/variable permissions

##User stories

These are discrete goals that an end-user would recognize as a new feature or update. 
 * Using pre-populated sample data, render a blog home page with x number of posts
 	- Define data structure for the blog posts 
 	- Create sample data
 	- Set up back end REST API to deliver mongodb data to the front end 
 	- Get angular to read the data
 	- Use angular to populate a front page
 - Set up a user and permissions system to log into a backend
 - Allow accessing a backend to create new posts
 - Allow backend access to see older posts and edit them
 - Allow backend access to delete old posts
 
##Programming tasks

 - Set up and test a connection to the local 'meanblog' database
 
##Blog post data structure