import { hookstate, useHookstate } from "@hookstate/core";

// create the cartState object
// in this example it's an array so we want to init to an empty array
// the count could be derived from the length of the array but is added here just to show a second property of the state
const userState = hookstate({
    user: null,
});

export function useUserState() {
    // assign state via the useHookstate hook, passing the object model above
    const state = useHookstate(userState);

    // CRUD functions that we need to make available, as well as helpers like count
    return {
        setUser(cUser) {
            // set with the current user
            state.user.set(cUser);
            // console.log('cUser is: ' + JSON.stringify(state.user.get()));

            return true;
        },
        
        clearUser() {            
            // clear the user
            state.user.set(null);
                        
            return true;
        },        

        getUser() {
            // get the user
            return state.user.get();
        },
        
    };
}


