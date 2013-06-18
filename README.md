MockTime!!
==========

Mocktime is a simple interface for breaking apart complex calculations, and viewing how things change.

But HOW?!?!
-----------
Mocktime works on a simple assumption that your equation as a single independent variable (ie: time) and an infinite number of dependent variables (ie: money, happiness, beavers).

You setup all your dependent variables, and then define how the interact with eachother and with the dependent variable.  These relationships are defined in plan english so your head doesn't blow up.  (ie: every time `rivers` increases by `1`, increase `beavers` by `100`).

Then, when everything is setup, you are given a slider to increase/decrease your independent variable.  As it moves you will see the calculated values of each of your dependent variables, and a percentage bar graph comparing them.

But WHY?!?!
-----------
I [blogged](http://wegnerdesign.com/blog/for-math-there-is-mocktime/) about it.

I WANT IT!!!!
-------------
Lucky for you, Mocktime is a stupid simple Node.js script.  Just clone the repository, run `npm install`, and start app.js (ie: `node app.js`).  Then you're golden!

*Note: Mocktime was built to run on Heroku.  So, you can probably run it on Heroku*
