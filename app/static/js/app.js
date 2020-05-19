/* Add your Application JavaScript */

Vue.component("app-header", {
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand cursive" href="#"><i class="fas fa-camera"> <img src = "/static/uploads/camera.png" width = "20" height = "24" class = "pb-1 mr-2"> </i> Photogram </a>
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
            <router-link class="nav-link" to="/users/:user_id"> My Profile <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link id = "Logout" class="nav-link" to="/logout">Logout<span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `,
  data: function () {
    return {};
  },
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
                            <i class = "fas fa camera" > </i> <h3 class = "text-center mt-2 cursive">  <img src = "/static/uploads/camera.png" width = "20" height = "24" class = "pb-1 mr-2"> Photogram</h3>
                            <hr>
                            
                            <p class = ""> Share photos of your favourite moments with friends, family and the world. </p>
                        </div>
                        <div class = "d-flex flex-row w-100 justify-content-center"> 

                            <button class = "btn btn-green m-3 p-2 w-50 text-white font-weight-bold" @click="$router.push('register')"> Register </button> 
                            
                            <button class = "btn btn-primary text-white w-50 p-2 m-3 font-weight-bold" @click="$router.push('login')"> Login </button>  
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
      <div class="container">
          <div class="row explore-card">
            <div class="col-md-9">
              <div class="card explore-card-btm mb-3  explore-card-group" v-for= "post in posts" >
                  <div class="card-header explore-card-header">

                      <!--place user profile image here-->

                      <div class="explore-card-pi">
                          <img :src=" '/static/uploads/' + post.proPhoto" class="card-img-top" alt="..." width="30" height="30">
                      </div>

                      <!-place username here-->
                      <p class="explore-card-username" ><a href="#" ><strong>{{post.username}}</strong></a></p>
                  </div>
                  <img :src=" '/static/uploads/' + post.photo" class="card-img-top explore-card-postimg" alt="..." >

                  <div class="card-body">
                      <p class="card-text">
                      {{post.caption}}
                      </p>
                  </div>

                  <div class="card-footer" style="background-color: white;">
                      <div class="float-left">
                      <p> <i class = "fas fa camera" ></i><strong>{{post.likes}} likes</strong></p> 
                      </div>

                      <!--place date here-->

                      <div class="float-right">
                      <p><strong>{{post.created_on}}</strong></p>
                      </div>
                  </div>
              </div>
            </div>
            <div class="col-md-3 float-right">
              <router-link class="btn btn-primary m-3 p-2 w-100 text-white" to="/posts/new">New Post</router-link> 
       
            </div>
            
          </div>
          
      
  
    </div>
    `,
  data: function () {
    return {
      posts: [],
      errors: [],
    };
  },
  created: function () {
    let self = this;
    fetch("api/posts", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "X-CSRFToken": token,
      },
      credentials: "same-origin",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonResponse) {
        console.log(jsonResponse);
        self.posts = jsonResponse.response["0"].posts;
        self.errors = jsonResponse.errors;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
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
      <div class = "d-flex flex-column align-items-center">
            <h4 class = "font-weight-bold "> Register </h4>
            <div class = "m-2"> 
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
            <div class = "card w-50 h-60 d-flex flex-column m-2 border rounded">
                
                <form class="form-group m-4 p-2 " @submit.prevent="registerInfo" method='POST' id="RegisterForm" enctype ="multipart/form-data">
                   
                    
                        <div class="col-xs-5">
                            <label for="username"> <h5> Username </h5> </label>
                            <input type="text"  class = "form-control" name="username" id="username" placeholder="Enter a username">
                        </div>
                    
                    
                        <div class="col-xs-5">
                            <label for="password"> <h5>Password</h5> </label>
                            <input type="password" class = "form-control" name="password" id="password" placeholder="password" >
                        </div>
                    
                        <div class="col-xs-5">
                            <label for="first_name"> <h5> First name</h5> </label>
                            <input type="text"   class = "form-control" name="first_name" id="first_name" placeholder="first name" >
                        </div>
                    

                        <div class="col-xs-5">
                            <label for="last_name"> <h5>Last name</h5> </label>
                            <input type="text" class = "form-control" name="last_name" id="last_name"
                                placeholder="last name" >
                        </div>
                   
                        <div class="col-xs-5">
                            <label for="email"> <h5>Email</h5>  </label>
                            <input type="text" class = "form-control" name="email" id="email" placeholder="you@email.com" >
                        </div>
                         <div class="col-xs-5">
                            <label for="location"> <h5>Location</h5>  </label>
                            <input type="text"  class = "form-control"id="location" name = "location" placeholder="Where are you from?">
                        </div>
                   
                        <div class="col-xs-5">
                            <label for="biography"> <h5>Biography</h5></label>
                            <textarea  rows ="4" class = "form-control" id="biography" name = "biography" placeholder="Enter a biography, Max Characters: 250"></textarea>
                        </div>
                        <div class = "mt-2 mb-2">
                        <h5> Photo</h5> 
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
        .then(function (jsonResponse) {
          // display a success message
          console.log(jsonResponse);
          if (jsonResponse.success["0"].message == "Successfully registered") {
          }
          self.success = jsonResponse.success;
          self.errors = jsonResponse.errors;
          self.$router.push('/login')
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
            <h5 class = "d-flex justify-content-left font-weight-bold"> Login</h5>
            <div class = "bg-white w-40 m-2 p-4 border rounded  shadow-lg">
                <form class="form-group p-2 " method="POST"   @submit.prevent="LoginUser" id= "LoginForm" >
                <div class = "d-flex flex-column align-content-center m-4 p-2">
                    <div class=" mt-3">
                            <label for="username">
                                <h5>Username</h5>
                            </label>
                            <input class = "input-group input-group-lg p-2  mb-2" type="text"  name="username" id="username" placeholder="Enter a username" >
                    </div>
                    <div class="mb-2">
                      <label for="password">
                                <h5>Password</h5>
                            </label>
                            <input class = "input-group input-group-lg p-2  mb-2" type="password"  name="password" id="password"
                                placeholder="Enter Password" >
                    </div>                             
                    <div class=" d-flex justify-content-center mb-2 p-2">
                            <button class="btn btn-lg btn-green text-white font-weight-bold" v-if = "isAuthenticated" type="submit"><i
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
      errors: [],
      isAuthenticated: true,
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
          // self.success = jsonResponse.success;
          // self.errors = jsonResponse.errors;
          if (jsonResponse.success != null) {
            let userid = jsonResponse.success["0"].userid;
            let jwt_token = jsonResponse.success["0"].token;
            localStorage.setItem("token", jwt_token);
            localStorage.setItem("userid", userid);
            console.info("Token generated and added to localStorage.");
            self.token = jwt_token;
            self.$router.push("/explore");
            msg = "Login successful";
          } else {
            self.msg = jsonResponse.errors["0"];
          }
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
        {{message}}
        </h1>
    </div> 
    `,
  data: function () {
    return {
      message: "",
    };
  },
  created: function () {
    let self = this;
    fetch("/api/auth/logout", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "X-CSRFToken": token,
      },
      credentials: "same-origin",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonResponse) {
        // display a success message
        //console.log(jsonResponse);
        if (
          jsonResponse.response["0"].message ==
          "You have been logged out successfully"
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("userid");
          let message = "You have been logged out ";
          let logout = document.getElementById("Logout");
          logout.classList.add("hide-display");
          // self.$router.push('/');
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  },
});

const UserProfile = Vue.component("profile", {
  template: `
        <div>
            <div class = "shadow p-3 mb-5 bg-white rounded">
                <div class = "row">
                    <div class = "col-9 row">
                        <div class = "col-3 pr-3">
                        <img :src="'../static/uploads/' + profilePic" alt="icon" height="180" width="200" class = "mb-3"> 
                        </div>

                        <div class = "col-8 pl-3 mt-3">
                            <div class = "user-name">
                                {{username}}
                            </div>

                            <div class = "location mt-3">
                                {{loctn}}
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
                <div v-for="post in posts" class = "col-4">
                    <img :src="'/static/uploads/' + post.photo" height="350" width="350" class = ""> 
                </div>


            </div>
    
       
        </div>
    `,
  data: function () {
    return {
      uid : localStorage.getItem('userid'),
      user_details: [],
      username: '',
      loctn: '',
      membership: '',
      biography: '',
      postNum: 0,
      follNum: 0,
      profilePic: '',
      posts: [],
    };
  },
  
  created: function () {
    let self = this;
    let userid = self.uid;
    fetch('/api/users/' + userid + '/posts', {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "X-CSRFToken": token,
      },
      credentials: "same-origin",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonResponse) {
        console.log(jsonResponse);
        self.username = jsonResponse.response[0].username;
        self.loctn = jsonResponse.response[0].location;
        self.membership = jsonResponse.response[0].joined_on;
        self.biography = jsonResponse.response[0].biography;
        self.postNum = jsonResponse.response[0].numpost;
        self.follNum = jsonResponse.response[0].numfollower;
        self.profilePic = jsonResponse.response[0].profile_photo;
        self.posts = jsonResponse.response[0].posts
      })
      .catch(function (error) {
        console.log(error);
      });
  },
});
const NewPost = Vue.component("new-post", {
  template: `
        <div> 
          <div class = "d-flex flex-column align-items-center nw-post-container">
            <div class="nw-post-title"> 
              <h4><strong> New Post</strong> </h4>
            </div>
            <div class = "bg-white w-50 m-2 p-5 border rounded  shadow-lg ">
              <form class="form" id="PostForm"  @submit.prevent="NewPost" method="POST" enctype="multipart/form-data">
                <div class="nw-post-labels">
                
                <!--photo upload here-->
                  <div>
                  <label for= 'photo' ><h5> <strong>Photo</strong></h5></label> 
                  </div>
                  <div>
                  <input type = "file" id = "photo" name = "photo">
                  </div>
                </div>
                <div class="nw-post-labels"> 

                <!--place caption here-->
                  <div>
                    <label for= 'caption' ><h5><strong>Caption</strong></h5></label>
                  </div>
                  <div>
                    <textarea  rows ="4" class = "form-control" id="postcaption" name = "caption" placeholder="Write a Caption ..."></textarea>
                  </div>
                </div>
                <div class="w-100">
                  <button class = "btn btn-green w-100 success text-white btn-lg font-weight-bold" type = "submit"> Submit</button> 
                </div> 
              </form>
            </div>
          </div>
        </div>
  
  
  
  `,
  data: function () {
    return {
      id: localStorage.getItem('userid'),
      
      
    };
  },
  methods: {
    NewPost: function () {
      let self = this;
      let postForm = document.getElementById("PostForm");
      let form_data = new FormData(postForm);
      let userid = self.id;
      fetch('/api/users/'+ userid + '/posts', {
        method: "POST",
        body: form_data,
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
          "X-CSRFToken": token,
        },
        credentials: "same-origin",
      })
        .then(function(response) {
          return response.json();
        })
        .then(function (jsonResponse) {
          console.log(jsonResponse);
          // add if statement
          self.$router.push('/explore')
          // self.
        })
      },
    },
     

});


// Define Routes
const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Home },

    { path: "/register", component: Register },

    { path: "/login", component: Login },

    { path: "/logout", component: Logout },

    { path: "/explore", component: Explore },

    { path: "/users/:userid", component: UserProfile },

    { path: "/posts/new", component: NewPost },

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
