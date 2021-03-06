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
 * Set up a user and permissions system to log into a backend
   * Create a user schema and API
   - Configure a passport authentication strategy to allow login via username + password
   -
 - Allow accessing a backend to create new posts
 - Allow backend access to see older posts and edit them
 - Allow backend access to delete old posts
 - Create authentication system to manage database access

##Programming tasks

 - Create update post task
 - Figure out how to set a default URL for the posts OR figure out if we don't even need to save a URL with a post... can just query the DB based on URL and permalink settings later


##Blog post data structure