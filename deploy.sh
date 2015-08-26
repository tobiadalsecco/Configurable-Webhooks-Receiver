#!/bin/sh
#
# Description:
#	Script will receive 3 Arguments (Project Name, Environment, Branch)
#	Various things happening here: 
#	1.) Changing to the repo directory
#	2.) Resetting the local master branch to look exactly like remote origin master branch
# 	3.) Clean off any files that don't need to be there
#	4.) Pull just to be doubly sure we have all the latest changes
#	5.) Switches branch to master just to be extra sure that we are on the right 
#		branch and our working tree has the right files.
#	
# Written by: LM
# Modified by Tobia Dalsecco
#

if [[ -n "$1" ]] ; then
	PROJECT_DIR=$1
else
	PROJECT_DIR="no_project_dir"
fi

if [[ -n "$2" ]] ; then
	BRANCH=$2
else
	BRANCH="master"
fi

echo current repo is $PROJECT_DIR
echo current branch is $BRANCH
cd $PROJECT_DIR
git reset --hard origin/$BRANCH
git clean -f
git pull
git checkout $BRANCH

echo "#-----------------------------------------------#"
echo "#               Git Pull Completed              #"
echo "#-----------------------------------------------#"