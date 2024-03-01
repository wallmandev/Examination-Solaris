// Define a function to handle planet-related functionality asynchronously
const planets = async () => {
    // Log a message indicating that the planets function has been executed
    console.log("Inside planets function");

    // Define an array of styles for planet buttons
    const myStyles = [
        {width: '300px', height: '300px'},
        {width: '300px', height: '300px'},
        {width: '300px', height: '300px'},
        {width: '300px', height: '300px'},
        {width: '300px', height: '300px'},
        {width: '300px', height: '300px'},
        {width: '300px', height: '300px'},
        {width: '300px', height: '300px'},
        {width: '300px', height: '300px'}   
    ];

    // Add an event listener to execute code when the DOM content is loaded
    document.addEventListener("DOMContentLoaded", function() {
        // Retrieve the go-back button element
        const goBackButton = document.getElementById("go-back");
        
        // Add an event listener to reload the page when the go-back button is clicked
        goBackButton.addEventListener("click", function() {
            location.reload(); // Reload the page
        });
    });

    // Define variables to store references to elements related to planet details
    const planetDesc = document.querySelector('.planet-details__description');
    const planetHeader = document.querySelector('.planet-details__header')
    const planetLatin = document.querySelector('.planet-details__latin')

    // Define a function to update the details of the selected planet
    const updateSelectedPlanetDetails = (planetData) => {
        // Extract information from planet data and update corresponding elements
        const distanceFromSunData = planetData.distance.toLocaleString();
        fromSun.textContent = `${distanceFromSunData} KM från solen`;
        tempDay.textContent = planetData.temp.day;
        tempNight.textContent = planetData.temp.night;
        planetDesc.textContent = planetData.desc;
        planetHeader.textContent = planetData.name;
        planetLatin.textContent = planetData.latinName;
    };

    // Define variables to store references to various elements
    const container = document.querySelector('.container')
    const planetContainer = document.querySelector('.planet-container');
    const infoElement = document.getElementById('planet-info');
    const searchInput = document.querySelector('.search-text');
    const searchForm = document.querySelector('.search-form');
    const searchResults = document.getElementById('planet-info');
    const fromSun = document.getElementById('planet-details__fromsun');
    const tempDay = document.getElementById('planet-temp__day');
    const tempNight = document.getElementById('planet-temp__night');
    const goBack = document.getElementById('go-back');

    // Define a function to display planets based on the provided data
    const showPlanets = (planets) => {
        // Log a message indicating that the showPlanets function has been executed
        console.log("Inside showPlanets function :");
    
        // Sort the planets array by distance in descending order
        planets.sort((a, b) => planets.distance - planets.distance);
        console.log("Planets sorted by distance:", planets);
    
        // Iterate through the sorted array and create HTML elements for each planet
        planets.forEach((planet, index) => {
            // Create a button element for the planet
            const planetElement = document.createElement('button');
            planetElement.id = `planet-${index}`;
            planetContainer.appendChild(planetElement);
        
            // Add an event listener for clicking a planet
            planetElement.addEventListener('click', event => {
                // Retrieve the clicked planet element and its index
                const clickedPlanet = event.target;
                const planetIndex = parseInt(clickedPlanet.id.split('-')[1]);
                const clickedPlanetData = planets[planetIndex]; // Get data for the clicked planet
        
                // Update planet details
                updateSelectedPlanetDetails(clickedPlanetData);

                // Apply styles to the clicked planet button
                const planetStyle = myStyles[index];
                Object.keys(planetStyle).forEach(property => {
                    planetElement.style[property] = planetStyle[property];
                });

                // Hide other planets
                planets.forEach((otherPlanet, otherIndex) => {
                    if (otherIndex !== index) {
                        const otherPlanetElement = document.getElementById(`planet-${otherIndex}`);
                        otherPlanetElement.style.display = 'none';
                    }
                });

                // Hide search form and display go-back button
                searchForm.style.display = 'none';
                planetContainer.style.position = 'static';
                planetContainer.style.padding = '10rem 0px 0px 40px';
                planetContainer.style.display = 'flex'
                planetContainer.style.width = '350px'
                goBack.style.display = 'block'
            });
        });

        // Define a function to reset the display of all planets
        const resetPlanetsDisplay = () => {
            planets.forEach((planet, index) => {
                const planetButton = document.getElementById(`planet-${index}`);
                planetButton.style.display = 'block'; // Show all planets
                planetButton.style.transform = 'scale(1)'; // Reset zoom level
            });
        };  

        // Define a function to search for planets based on the provided query
        const searchPlanets = (query) => {
            resetPlanetsDisplay(); // Reset planet display before each search
            const results = planets.filter(planet => planet.name.toLowerCase().includes(query.toLowerCase()));
            if (results.length === 1) {
                // Zoom in on the matching planet
                const targetPlanet = results[0];
                const targetIndex = planets.indexOf(targetPlanet);
                const targetButton = document.getElementById(`planet-${planets.indexOf(targetPlanet)}`);
        
                const planetStyle = myStyles[targetIndex];
                Object.keys(planetStyle).forEach(property => {
                    targetButton.style[property] = planetStyle[property];
                });

                if (results.length === 1) {
                    const targetPlanet = results[0];
                    const targetIndex = planets.indexOf(targetPlanet);
                    const targetButton = document.getElementById(`planet-${targetIndex}`);
            
                    // Update planet details
                    updateSelectedPlanetDetails(targetPlanet);
                }

                // Hide other planets
                planets.forEach((planet, index) => {
                    const planetButton = document.getElementById(`planet-${index}`);
                    if (planetButton !== targetButton) {
                        planetButton.style.display = 'none';
                    }
                    planetContainer.style.position = 'static';
                    planetContainer.style.padding = '12rem 0px 0px 1rem';
                });
            }
            return results;
        };

        // Add event listeners for mouseover and mouseout events on planet buttons
        planetContainer.addEventListener('mouseover', event => {
            const target = event.target;
            if (target.tagName === 'BUTTON') {
                target.classList.add('hovered');
                infoElement.textContent = planets[target.id.split('-')[1]].name;
            }
        });
        
        planetContainer.addEventListener('mouseout', event => {
            const target = event.target;
            if (target.tagName === 'BUTTON') {
                target.classList.remove('hovered');
                infoElement.textContent = '';
            }
        });

        // Add an event listener for the search form submission
        searchForm.addEventListener('submit', event => {
            event.preventDefault();
            const query = searchInput.value.trim();
            const results = searchPlanets(query);

            // Hide search form and display go-back button
            searchForm.style.display = 'none';
            goBack.style.display = 'block'
        });
    };
    
    // Define a function to fetch the API key
    const fetchAPIKey = async () => {
        try {
            const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
                method: 'POST',
                headers: {
                    'x-zocom': ''
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                const apiKey = data.key; // Assuming the API key is in the response JSON
                return apiKey;
            } else {
                throw new Error('Failed to fetch API key');
            }
        } catch (error) {
            throw new Error('Error fetching API key: ' + error.message);
        }
    };

    // Define a function to fetch planets data
    const fetchPlanets = async () => {
        try {
            const apiKey = await fetchAPIKey(); // Fetch the API key first
            const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
                method: 'GET',
                headers: {
                    'x-zocom': apiKey // Use the fetched API key in the request headers
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log("Received data from API:", data);
                showPlanets(data.bodies); // Display planets using fetched data
            } else {
                throw new Error('Failed to fetch planets: ' + response.statusText);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    
    fetchPlanets(); // Invoke the function to fetch planets data
};

planets(); // Call the planets function to initiate the process