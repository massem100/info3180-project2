/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/upload">Upload <span class="sr-only">(current)</span></router-link>
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
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
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

const UploadForm = Vue.component('upload-form', {
    template: `

    
    <div class = " w-100 h-75 p-2">
        <h2 class = "font-weight-bold ml-0 mb-4"> Upload Form </h2>
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
        <form id="uploadForm"  @submit.prevent="uploadPhoto" method="POST" enctype="multipart/form-data">
                <div class="form-group h-75 ">
                    <label for="description">Description </label>
                    <textarea class = "form-group w-100 h-50 rounded shadow p-4 box-height" id = "description" name="description" placeholder = "Enter photo description. Maximum Characters: 150"></textarea>
                </div>
                <div class="form-group">
                    <label for="photo" class = "">Photo Upload</label><br>
                    <input type="file" id= "photo" name="photo"/>
                </div>
                <div>
                    <button class="btn bg-primary" type="submit">Submit</button>
                </div>
         </form>
          
     </div>
    
    
    `,
    data: function () {
        return {
            success: [], 
            errors: []
        }
    },
    methods: {
        uploadPhoto: function () {
            let self = this;
            let uploadForm = document.getElementById('uploadForm');
            let form_data = new FormData(uploadForm);
            fetch("/api/upload", {
                method: 'POST',
                body: form_data,
                headers: {
                    'X-CSRFToken': token
                },
                credentials: 'same-origin'

            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (jsonResponse) {
                    // display a success message
                    console.log(jsonResponse);
                    self.success = jsonResponse.success;
                    self.errors = jsonResponse.errors;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
});


// Define Routes
const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: "/", component: Home },
        // Put other routes here
        { path: "/upload", component: UploadForm },
        // This is a catch all route in case none of the above matches
        { path: "*", component: NotFound }
    ]
});

// Instantiate our main Vue Instance
let app = new Vue({
    el: "#app",
    router
});