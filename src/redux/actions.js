export const ActionType = {
  test: 'TEST_ACTION',
};

export const testAction = ()=> (
    {
        type: ActionType.test,
        payload: 'REDUX TEST WORKS'
        // payload: {
        //     request: {
        //         url: `/users/${user}/repos`
        //     }
        // }
    }
);