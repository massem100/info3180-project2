/* Add your Application JavaScript */
Vue.component("app-header", {
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand cursive" href="#"><i class="fas fa-camera"> <img src = "../static/images/camera.png" width = "20" height = "24" class = "pb-1 mr-2"> </i> Photogram </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/explore">Explore<span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/users"> My Profile <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/logout">Logout<span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `,
});

Vue.component("app-footer", {
  template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `,
});

const Home = Vue.component("home", {
  template: `
    <div class ="d-flex align-content-center t m-4 "> 
        <div class = "d-flex flex-row align-content-center  h-50"> 
            <div class = " m-2 w-50" > 
                <img class = "home-image border border-secondary " src="/static/uploads/bridge.jpg"/>
            </div>
            
                <div class = "card  col-md-5 " > 
                        <div class = "mb-5">
                            <i class = "fas fa camera" > </i> <h3 class = "text-center mt-2 cursive">  <img src = "../static/uploads/camera.png" width = "20" height = "24" class = "pb-1 mr-2"> Photogram</h3>
                            <hr>
                            
                            <p class = ""> Share photos of your favourite moments with friends, family and the world. </p>
                        </div>
                        <div class = "d-flex flex-row w-100 justify-content-center"> 

                            <button class = "btn btn-success m-3 p-2 w-50 text-white" @click="$router.push('register')"> Register </button> 
                            
                            <button class = "btn btn-primary text-white w-50 p-2 m-3" @click="$router.push('login')"> Login </button>  
                        </div>
                </div> 
          


        </div> 
    </div>

   `,
  data: function () {
    return {};
  },
});

const Explore = Vue.component("explore", {
  template: `
      <div>
          
          <div  class="card-group explore-card-group" >
              <div class="card explore-card"  >
                  <div class="card-header explore-card-header">
  
                      <!--place user profile image here-->
  
                      <div class="explore-card-pi">
                          <img src="/static/uploads/bridge.jpg" class="card-img-top" alt="..." width="30" height="30">
                      </div>
  
                      <!-place username here-->
                      <p class="explore-card-username"><strong>username</strong></p>
                  </div>
                  <img src="/static/uploads/bridge.jpg" class="card-img-top explore-card-postimg" alt="..." >
  
                  <div class="card-body">
                      <p class="card-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                      culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                  </div>
  
                  <div class="card-footer" style="background-color: white;">
                      <div class="float-left">
                      <p> <i class = "fas fa camera" ></i><strong>10 likes</strong></p> 
                      </div>
  
                      <!--place date here-->
  
                      <div class="float-right">
                      <p><strong>24 April 2018</strong></p>
                      </div>
                  </div>
              </div>
              
              
          </div>
          <div class="float-right explore-npost-btn" >
              <button class = "btn btn-primary " > New Post </button> 
          </div> 
  
    </div>
    `,
});

const NotFound = Vue.component("not-found", {
  template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
  data: function () {
    return {};
  },
});

const Register = Vue.component("register", {
  template: `
    
            <div class = "card w-50 d-flex flex-column m-2 border rounded">
                <div> 
                        <ul v-for= "data in success" class="list alert alert-success"> 
                                {{data.message}}
                        
                        </ul>
                        
                        <ul v-for = "error in errors" class="list alert alert-danger d-flex flex-column"> 
                            <li class = "ml-3" > 
                                {{error.errors[0]}} 
                            </li>
                                                        
                            <li class = "ml-3">
                                    {{error.errors[1]}}    
                            
                            </li>

                        </ul> 
                </div>
                <form class="form-group m-4 p-2" @submit.prevent="registerInfo" method='POST' id="RegisterForm" enctype ="multipart/form-data">
                   
                    
                        <div class="col-xs-6">
                            <label for="username"> <h4> Username </h4> </label>
                            <input type="text"  class = "form-control" name="username" id="username" placeholder="Enter a username">
                        </div>
                    
                    
                        <div class="col-xs-6">
                            <label for="password"> <h4>Password</h4> </label>
                            <input type="password" class = "form-control" name="password" id="password" placeholder="password" >
                        </div>
                    
                        <div class="col-xs-6">
                            <label for="first_name"> <h4> First name</h4> </label>
                            <input type="text"   class = "form-control" name="first_name" id="first_name" placeholder="first name" >
                        </div>
                    

                        <div class="col-xs-6">
                            <label for="last_name"> <h4>Last name</h4> </label>
                            <input type="text" class = "form-control" name="last_name" id="last_name"
                                placeholder="last name" >
                        </div>
                   
                        <div class="col-xs-6">
                            <label for="email"> <h4>Email</h4>  </label>
                            <input type="text" class = "form-control" name="email" id="email" placeholder="you@email.com" >
                        </div>
                         <div class="col-xs-6">
                            <label for="location"> <h4>Location</h4>  </label>
                            <input type="text"  class = "form-control"id="location" name = "location" placeholder="Where are you from?">
                        </div>
                   
                        <div class="col-xs-6">
                            <label for="biography"> <h4>Biography</h4></label>
                            <textarea  rows ="4" class = "form-control" id="biography" name = "biography" placeholder="Enter a biography, Max Characters: 250"></textarea>
                        </div>
                        <div class = "mt-2 mb-2">
                        <h4> Photo</h4> 
                        <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                        </div>
                        <div class="custom-file">
                            
                            <input type="file" class="custom-file-input"  name = "photo" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01">
                            <label class="custom-file-label" for="inputGroupFile01">Choose Files</label>
                        </div>
                        </div>
                    </div>
                    <div class=" d-flex justify-content-center p-2">
                        <div class="col-xs-12">
                            <br>
                            <button class="btn btn-lg btn-success" type="submit" ><i
                                    class="glyphicon glyphicon-ok-sign"></i> Register </button>
                            
                        </div>
                    </div>
                </form>
           
        
        </div>
        `,
  data: function () {
    return {
      success: [],
      errors: [],
    };
  },
  methods: {
    registerInfo: function () {
      let self = this;
      let registerForm = document.getElementById("RegisterForm");
      let form_data = new FormData(registerForm);
      fetch("/api/users/register", {
        method: "POST",
        body: form_data,
        headers: {
          "X-CSRFToken": token,
        },
        credentials: "same-origin",
      })
        .then(function (response) {
          return response.json();
        })
        // .then((text)=> console.log(text))
        .then(function (jsonResponse) {
          // display a success message
          console.log(jsonResponse);
          self.success = jsonResponse.success;
          self.errors = jsonResponse.errors;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
});

const Login = Vue.component("login", {
  template: `
        <div>
    
       <div class = "d-flex flex-column align-items-center m-2"> 
            <h4 class = "d-flex justify-content-left font-weight-bold"> Login</h4>
            <div class = "card w-50 d-flex m-2 border rounded">
                <form class="form-group m-4 p-2" method="post"  id= "LoginForm" enctype = 'multipart/form-data'>
                    <div class="form-group mt-3">
                        <div class="col-xs-6">
                            <label for="username">
                                <h4>Username</h4>
                            </label>
                            <input type="text"  name="username" id="username" placeholder="Enter a username" >
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-6">
                            <label for="password">
                                <h4>Password</h4>
                            </label>
                            <input type="password"  name="password" id="password"
                                placeholder="password" >
                        </div>
                    </div>                             
                    <div class="form-group d-flex justify-content-center p-2">
                        <div class="col-xs-12">
                            <br>
                            <button class="btn btn-lg btn-success" type="submit"><i
                                    class="glyphicon glyphicon-ok-sign"></i> Login </button>
                            
                        </div>
                    </div>
                </form>
            </div>
        </div> 
        </div>

    
    
    
    
    `,
  data: function () {
    return {
      success: [],
      erros: [],
    };
  },
  methods: {
    LoginUser: function () {
      let self = this;
      let loginForm = document.getElementById("LoginForm");
      let form_data = new FormData(loginForm);
      fetch("/api/auth/login", {
        method: "POST",
        body: form_data,
        headers: {
          "X-CSRFToken": token,
        },
        credentials: "same-origin",
      })
        .then(function (response) {
          return response.json();
        })
        // .then((text)=> console.log(text))
        .then(function (jsonResponse) {
          // display a success message
          console.log(jsonResponse);
          self.success = jsonResponse.success;
          self.errors = jsonResponse.errors;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
});

const Logout = Vue.component("logout", {
  template: `
    <div class = "m-5 text-center"> 
        <h1> 
        You have been logged out
        </h1>
    </div> 


    `,
});

const UserProfile = Vue.component("profile", {
  template: `
        <div>
            <div class = "shadow p-3 mb-5 bg-white rounded">
                <div class = "row">
                    <div class = "col-9 row">
                        <div class = "col-3 pr-3">
                            <img src="/static/images/propic.png" alt="icon" height="180" width="200" class = "mb-3"> 
                        </div>

                        <div class = "col-8 pl-3 mt-3">
                            <div class = "user-name">
                                {{username}}
                            </div>

                            <div class = "location mt-3">
                                {{location}}
                            </div>

                            <div class = "membership">
                                Member since {{membership}}
                            </div>

                            <div class = "user-bio mt-3 mb-2">
                                {{biography}}
                            </div>
                        </div>
                    </div>

                    <div class = "col-3 mt-3 row center">
                        <div class = "col-6"> 
                            <div class = "post-follow-num">
                                {{postNum}}
                            </div>
                            <div class = "post-follow-label">
                                Posts
                            </div>
                        </div>


                        <div class = "col-6">
                            <div class = "post-follow-num">
                                {{follNum}}
                            </div>
                            <div class = "post-follow-label">
                                Followers
                            </div>
                        </div>

                        <div class = "wt-lrg">
                            <button class="btn btn-primary ml-2 btn-width">
                                Follow
                            </button>
                        </div>
                    </div>

                </div>




            </div>

            <div class = "row">
                <div class = "col-4">
                    <img src="/static/images/bridge.jpg" height="350" width="350" class = ""> 
                </div>

                <div class = "col-4">
                    <img src="/static/images/bridge.jpg" height="350" width="350" class = "">
                </div>

                <div class = "col-4">
                    <img src="/static/images/bridge.jpg" height="350" width="350" class = "">
                </div>


            </div>
    
       
        </div>
    `,
  data: function () {
    return {
      username: "Jane Doe",
      location: "Kingston, Ja",
      membership: "Jan 2020",
      biography:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      postNum: "93",
      follNum: "239",
      posts: [],
    };
  },
});

// Define Routes
const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Home },

    { path: "/register", component: Register },

    { path: "/login", component: Login },

    // { path: "/logout", component: Logout },

    { path: "/explore", component: Explore },

    { path: "/users/{user_id}", component: UserProfile },

    // { path: "/posts/new", component: NewPost},

    // Put other routes here
    // This is a catch all route in case none of the above matches
    { path: "*", component: NotFound },
  ],
});

// Instantiate our main Vue Instance
let app = new Vue({
  el: "#app",
  router,
});
