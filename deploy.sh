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


cd $1
git reset --hard origin/$2
git clean -f
git pull
git checkout $2

echo "Git Pull Completed"