Hive.js
=======

A JavaScript clone of the super-sweet tile strategy game Hive.


## tl;dr Dev Setup

Run this:

``sudo npm install -g grunt-cli buster && npm install && ./git-hooks.sh``


## Grunt Testing

We use Grunt to automate testing and cleanup of this project and Buster.js to test
it. You'll need to install both globally for them to work. To do so, run:

``
sudo npm install -g grunt-cli buster
``

We also use various other packages like Express and Socket.io. To install all
other project dependencies, run this from inside the project directory:

``
npm install
``

You're good to go!


### Autotesting

To keep the project clean, we've provided a git hook that will autorun tests before
each commit and force you to fix failing tests before committing. To install the
hook, run the `git-hooks.sh` script by running `./git-hooks.sh` at the project root
directory.

But sometimes, you gotta make a dirty commit. If you have to, you can override the
hook by passing the `-n` flag to `git commit`. If you do this, please make a note of
failing specs in your git commit/pull request.


## Style Rules

JavaScript indentation should be set to two spaces, soft tabbed. HTML files
should be set to hard tabs to make using the Chrome element inspector easier.
