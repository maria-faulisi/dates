AccountsTemplates.configureRoute('signIn', {layoutTemplate: 'appLayout'});
AccountsTemplates.configureRoute('signUp', {layoutTemplate: 'appLayout'});
AccountsTemplates.configureRoute('ensureSignedIn', {layoutTemplate: 'appLayout'});


AccountsTemplates.addFields([
    {
        _id: 'firstname',
        displayName: 'First Name',
        placeholder: 'First Name',
        type: 'text',
        required: true
    },
    {
        _id: 'lastname',
        displayName: 'Last Name',
        placeholder: 'Last Name',
        type: 'text',
        required: true
    }
]);

