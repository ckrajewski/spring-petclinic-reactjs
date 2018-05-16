# To be done
- [x] schedule a visit
- [ ] localization
- [ ] align error messages in validations from server and client
- [x] Creating a visit should not be possible if requirements (i.e. date/description) are missing (Client side validation only)
- [ ] Supplement client side validation with server side validation
- [ ] Ensure that the current format of selecting appointment start time + end time meets P.O. requirements
- [ ] Add more security for delete records (should not just be a simple get operation)
- [ ] Existing JUnit tests are passing, but more should be added to test newly added visit functionality
- [ ] Better error and messaging handling (most are done through alerts on the VisitsPage currently)

# Refactoring / Clean up
- [ ] General clean-up as this is an own repository now and not only a branch
- [ ] Use Redux to centralize back end calls. Can be organized through having a seperate folder for different  actions so they can be imported when needed
- [ ]  Update to latest Typescript version (currently 2.0.10)

# New Features
- [x] add client-side validation to input fields to show advantage of SPA 
- [ ] introduce redux to cache entities on client? (on new branch?)
- [ ] more 'in-place' editing instead of own pages (more SPA-ish feeling)
- [ ] client-side testing

# Differences from original spring boot example
* Client-side validation
* Can now add appointments using a cool calendar UI!
* Can select appointment time ranges too!