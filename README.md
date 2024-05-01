# How To Run On Local Machine

- Create .env from .env.example
- ```yarn```
- ```npm start```

# List Of Routes

- ```/``` Show List of users
- ```/menu``` Show Posts and Albums menu
- ```/posts``` Show list of Posts from selected user
- ```/albums``` Show list of Albums from selected user
- ```/albums/:id/photos``` Show list of Photos from selected album

# List Of Feature
1. Replicate function of login and logout using idb-keyval
2. When user already selected or logged, it will be saved on local storage so you don't need to select the user again everytime you open the page
3. Replicate the function of add, edit, and delete using state, so if you stay on the page (or the page not refreshed) the updated data will still shown on the page
4. If you want to logout simply click the username on the header and choose to logout

# List Of Technology Used
- React
- Redux
- IDB Keyval
- Tailwind CSS
- Bootstrap

### For the demo [Click Here](https://axa-react-test.vercel.app)