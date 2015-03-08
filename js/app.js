

var app = app || {}


app.user = (function($) {

    var UserEntryView = function(email) {
        var self = this;

        this.firstname = ko.observable();
        this.lastname = ko.observable();
        this.age = ko.observable();
        this.email = ko.observable(email);
        this.getDetails = function() {
            var userData = app.data.getUserData();
            $.when( userData ).done(function( data ) {
                for(var prop in data[0]) {
                    self[prop]( data[0][prop] );
                }
            });
        },
        this.submitDetails = function() {

            var submitData = {
                firstname: this.firstname(),
                lastName: this.lastname(),
                age: this.age(),
                email: this.email()
            }

            var userSubmit = app.data.submitUserData( submitData );
            $.when( userSubmit ).done(function( data ) {
                console.log( data );
            }).fail(function( error ) {
                console.log( error )
            })
        }

    },
    userEntry = new UserEntryView();


    return {
        UserEntryView: UserEntryView,
        userEntry: userEntry
    }


}(jQuery))



app.data = (function($) {

    var getUserData = function() {
        return $.ajax({
            url: 'api/get_user_data.php',
            type: 'get',
            dataType: 'json'
        })
    },
    submitUserData = function( submitData ) {
        return $.ajax({
            url: 'api/submit_user_data.php',
            type: 'post',
            data: submitData
        })
    }


    return {
        getUserData: getUserData,
        submitUserData: submitUserData
    }

}(jQuery))




ko.applyBindings( app.user.userEntry, document.getElementById('user-entry-container') );

