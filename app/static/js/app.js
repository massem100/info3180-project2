/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand " href="#"><i class="fas fa-camera"> </i> Photogram </a>
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
            <router-link class="nav-link" to="/profile"> MyProfile <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/logout">Logout<span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

Vue.component('app-footer', {
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; Flask Inc.</p>
        </div>
    </footer>
    `
});


const Home = Vue.component('home', {
    template: `
    <div class ="d-flex align-content-center t m-4 "> 
        <div class = "d-flex flex-row align-content-center  h-50"> 
            <div class = " m-2 w-50" > 
                <img class = "home-image border border-secondary " src="/static/images/bridge.jpg"/>
            </div>
            
                <div class = "card  col-md-5 " > 
                        <div class = "mb-5">
                            <i class = "fas fa camera" > </i> <h3 class = "text-center mt-2"> Photogram</h3>
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
        return {}
    }
});

const NotFound = Vue.component('not-found', {
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data: function () {
        return {}
    }
});

const Register = Vue.component('register', {
    template:

    `
    <div>
    
       <div class = "d-flex flex-column align-items-center m-2"> 
            <h4 class = "d-flex justify-content-left font-weight-bold"> Register </h4>
            <div class = "card w-50 d-flex m-2 border rounded">
                <form class="form-group m-4 p-2" action="##" method="post" id="registrationForm" enctype = 'multipart/form-data'>
                    <div class="form-group mt-3">
                        <div class="col-xs-6">
                            <label for="username">
                                <h4>Username</h4>
                            </label>
                            <input type="text" class="form-control" name="username" id="username"
                                placeholder="Enter a username" title="Enter a username">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-6">
                            <label for="password">
                                <h4>Password</h4>
                            </label>
                            <input type="password" class="form-control" name="password" id="password"
                                placeholder="password" title="enter your password.">
                        </div>
                    </div>         
                    <div class="form-group">
                        <div class="col-xs-6">
                            <label for="first_name">
                                <h4>First name</h4>
                            </label>
                            <input type="text" class="form-control" name="first_name" id="first_name"
                                placeholder="first name" title="enter your first name if any.">
                        </div>
                    </div>
                    <div class="form-group">

                        <div class="col-xs-6">
                            <label for="last_name">
                                <h4>Last name</h4>
                            </label>
                            <input type="text" class="form-control" name="last_name" id="last_name"
                                placeholder="last name" title="enter your last name if any.">
                        </div>
                    </div>

                   <div class="form-group">
                        <div class="col-xs-6">
                            <label for="email">
                                <h4>Email</h4>
                            </label>
                            <input type="email" class="form-control" name="email" id="email"
                                placeholder="you@email.com" title="enter your email.">
                        </div>
                    </div>
                    <div class="form-group">

                        <div class="col-xs-6">
                            <label for="location">
                                <h4>Location</h4>
                            </label>
                            <input type="text" class="form-control" id="location" placeholder="Where are you from?"
                                title="enter a location">
                        </div>
                    </div>
                    <div class="form-group">

                        <div class="col-xs-6">
                            <label for="biography">
                                <h4>Biography</h4>
                            </label>
                            <textarea type="text" rows ="4" class="form-control" id="biography" placeholder="Enter a biography, Max Characters: 250"
                                title="Enter a Biography"></textarea>
                        </div>
                    </div>
                    <div class="form-group">

                        <div class="col-xs-6 d-flex flex-column">
                            <label for="photo"> <h4>Photo </h4> </label>
                            <input type="file" class="" id="photo" placeholder="Browse">
                        </div>
                    </div>
                    
                    <div class="form-group d-flex justify-content-center p-2">
                        <div class="col-xs-12">
                            <br>
                            <button class="btn btn-lg btn-success" type="submit"><i
                                    class="glyphicon glyphicon-ok-sign"></i> Register </button>
                            
                        </div>
                    </div>
                </form>
            </div>
        </div> 
        </div>
        `
});

const Login = Vue.component('login', {
    template: `
        <div>
    
       <div class = "d-flex flex-column align-items-center m-2"> 
            <h4 class = "d-flex justify-content-left font-weight-bold"> Login</h4>
            <div class = "card w-50 d-flex m-2 border rounded">
                <form class="form-group m-4 p-2" action="##" method="post" id="registrationForm" enctype = 'multipart/form-data'>
                    <div class="form-group mt-3">
                        <div class="col-xs-6">
                            <label for="username">
                                <h4>Username</h4>
                            </label>
                            <input type="text" class="form-control" name="username" id="username"
                                placeholder="Enter a username" title="Enter a username">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-6">
                            <label for="password">
                                <h4>Password</h4>
                            </label>
                            <input type="password" class="form-control" name="password" id="password"
                                placeholder="password" title="enter your password.">
                        </div>
                    </div>                             
                    <div class="form-group d-flex justify-content-center p-2">
                        <div class="col-xs-12">
                            <br>
                            <button class="btn btn-lg btn-success" type="submit"><i
                                    class="glyphicon glyphicon-ok-sign"></i> Register </button>
                            
                        </div>
                    </div>
                </form>
            </div>
        </div> 
        </div>

    
    
    
    
    `
});

const Logout = Vue.component('logout', {
    template: 
    `
    <div class = "m-5 text-center"> 
        <h1> 
        You have been logged out
        </h1>
    </div> 


    `

});

// Define Routes
const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: "/", component: Home },

        {path: "/register", component: Register},

        { path: "/login", component: Login },

        // { path: "/logout", component: Logout },

        // { path: "/explore", component: Explore},

        // { path: "/users/{user_id}", component: UserPosts },

        // { path: "/posts/new", component: NewPost},

        // Put other routes here
        // This is a catch all route in case none of the above matches
        { path: "*", component: NotFound }
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});