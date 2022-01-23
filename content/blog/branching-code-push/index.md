---
title: Use Codepush for implementing efficient branching strategy for React Native 
date: "2022-01-22"
description: "How to use codepush sharing build with test engineers, implement efficient branching strategy using code push and react native"
---

I have shifted to React Native project from React web based project. we were having some issues with branching strategy and sharing builds efficiently with QA engineers. We will discuss about 3 problems we had solved with React native build sharing and branching strategy.

Let's dive into problems starting with problem no. 1.


###Problem 1
**Sharing builds with QA engineers is a big issue when it comes to mobile app development.**

For any minor bug fix or change sharing, new build(apk or ipa) isn't the most optimum solution, and as the team grows we need to give frequent builds for testing.
As we were working on React native there is a solution - Over air the updates.
We used Codepush which can be used to give over the air update without creating new builds.

For integration with Codepush in React Native check https://github.com/microsoft/react-native-code-push

And now how to give these codepush updates?  We created an automatic pipeline for running codepush whenever we merge our code into master branch. This made life easy for everyone

**Advantage of using this approach**

* No need to download more than 50 MB updates
* Reduced build time


###Problem 2
**Team has grown and we needed to deliver more features but as we are merging everything into the master branch and then testing it. For some reason, if we want to release our app and remove a few features which are already merged then reverting using source control (git) was the challenging problem. This would increase time to ship our app as after reverting any feature another round of regression would be needed.**

For this problem also codepush came to the rescue.

We created 10 codepush environments and create one manual pipeline which can be used to deploy branches to any of these 10 environments.

Now we changed our process of merging code in master. First Test engineer will test any feature before merging into master. Test engineer will run pipeline for feature branches to their dedicated environment, Test feature, and give sign off.
We merge the feature into master after sign-off.

How did we implement the above?

* Crete codepush number environment and get codepush key.
* Created one menu option for test builds only
* Aded an option to select environment.
* Store selected environment in async storage
* Restart app and use stored environment key to download codepush update

Sample code for environment selector:


```jsx

<FlatList
    data={[
        {
            value: '',
            label: 'Default',
        },
        ...environments,
    ]}
    renderItem={({ item }) => {
        const isChecked = environment === item.value;
        return (
            <TouchableOpacity
                onPress={() => {
                    await AsyncStorage.setItem("SELECTED_ENV", environment);
                    CodePush.restartApp();
                }}
                style={{ padding: 10, flexDirection: 'row' }}>
                <Checkbox
                    variant={antDesign}
                    checked={isChecked}
                    label={item.label}
                />
            </TouchableOpacity>
        );
    }}
/>
```

And in the pipeline, we created a pipeline variable to give the environment name, so we can use a single pipeline for deploying any of the environments. 

We achieved the following using the above approach:

* Test engineer has full control when to test feature
* No need to revert buggy features
* Ship release on time
  
This approach should work with most cases but we had one problem with the above approach so let's discuss problem number 3.


###Problem 3

**Now we are not merging before getting sign off from our test engineers and they have control over what they are testing but as the team is getting bigger if there are 2-3 people who need to test the same feature at the same time then they need to coordinate timing as with above approach once you deploy new branch to same environment previous update is overridden.**


Now we want to test before merging code to master and we also want to allow multiple people to test the same feature at the same time without them coordinating or getting blocked.

To solve the above we created squads-wise build.

What is squad-wise build?

The squad is nothing but a small group of people who are working on the same mini-project within the app.

So each squad will have its dedicated environments and we created dedicated branches for each squad and an automated pipeline to deploy code push when we merge anything to these squad branches.

But here developers need to merge their code to the squad branch and create Pull Request against the master, we didn't want to burden the developer to do this re-work task. So we created one simple shell script and added that into our package.json.

What does this shell script do?

* Push feature branch to remote
* Go to squad branch
* Merge feature branch into squad branch
* Push squad branch


```sh
#!/bin/sh

branch_name=$(git symbolic-ref -q HEAD)
branch_name=${branch_name##refs/heads/}

git branch --set-upstream-to origin/$branch_name
git push origin $branch_name

git checkout squad-branch
git fetch
git reset --hard origin/squad-branch
git merge $branch_name 
git branch --set-upstream-to origin/squad-branch
git push origin squad-branch

git checkout $branch_name

```

And developers need to use npm push:squad command to push their branch instead of normal git push and the script will do all the work.


With above approach solved problem no. 3 and we have following advantages:

* Automated pipeline so Test engineers don't need to run pipeline now
* Anyone can test all the features of the squad using their dedicated environment 
* Testing before merging code
* Developers also don't need to merge with 2 branches as we created a push script.