# Project 1: Shared shopping list  
  
This is an application for creating shopping lists and adding items to them.  
The added items can be marked collected from the shopping lists' individual page.  
You can also deactivate the shopping lists from the page listing all the shopping lists.  
The main page also shows statistics for how many shopping lists have been created and  
how many items have been added to them.  
  
My project is running at:  
https://dc-wsd-project1.onrender.com/  
  
You can run the application locally from the same folder this file is located in with the command:  
(On Windows/macOS?)  
docker-compose up  
(Ubuntu linux)  
sudo docker compose up  
  
## Tests  
!!!!!  
Some tests may not work on a used database  
so you may have to run the command to empty the local database:  
(On Windows/macOS?)  
docker-compose down  
(Ubuntu linux)  
sudo docker compose down  
!!!!!  
  
I wrote 7 tests for the application.  
  
You can run them with the command:  
(Windows/macOS?)  
docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf  
(Ubuntu linux)  
sudo docker compose run --entrypoint=npx e2e-playwright playwright test && sudo docker compose rm -sf  