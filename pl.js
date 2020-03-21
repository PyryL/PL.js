/*
    PL.js
    v1.0
    Pyry Lahtinen
    26.2.2020
*/



//related to intvl()
var intvlVars = []; //interval will be set here
var intvlIDs = []; //specific name of interval (used when clearing)
var intvlFuncs = []; //name of the function taht will be called every round of the interval
var intvlRounds = []; //how many round will be done
var intvlRoundsDone = []; //how many round have been done
function intvlRound(identifier) { //will be called every round of every interval
    //get the index of the interval
    var index = intvlIDs.indexOf(identifier);
    
    //how many rounds will be done
    var rounds = intvlRounds[index];
    //hwo many round have been done
    var roundsDone = intvlRoundsDone[index];

    //if rounds are not set (infinity) or not reached the limit
    if (rounds == undefined || rounds > roundsDone) {
        //get the name of the function that will be called
        var funcName = intvlFuncs[index];
        //call the function
        window[funcName]();
        //one more round done
        intvlRoundsDone[index] = roundsDone+1;
    } else if (rounds == roundsDone) { //limit reached
        //clear interval
        clearInterval(intvlVars[index]);
    }
}








class Pl {

    //get element(s)
    e(elem) {
        //param elem (str), id/classname/tagname of the wanted element(s)
            //in param elem, you can specify index, for example: .class[5] .class[odd] span[even]

        if (elem == "*") { //all elements
            //return all elements of the page
            return document.getElementsByTagName("*");
        } else if (elem.charAt(0) == "#") { //id of an element
            //get id (delete # at the beginning)
            var id = elem.substr(1, elem.length-1);

            //return the one element with given id
            return document.getElementById(id);
        } else if (elem.charAt(0) == ".") { //class
            //get classname (delete . at the beginning)
            var className = elem.substr(1, elem.length-1);

            //if input contains any index like [2] or [odd] or [even]
            if (elem.includes("[") && elem.includes("]")) {
                //where index part starts
                var startIndex = className.indexOf("[");
                //where index part ends
                var endIndex = className.indexOf("]");
                //get index from the string
                var index = className.slice(startIndex+1, endIndex);

                //remove index part from the classname
                className = className.slice(0, startIndex);

                if (index == "odd") {
                    //array of elements that are odd
                    var returnArray = [];

                    //array of all elements in that class
                    var elements = document.getElementsByClassName(className);

                    //pick odd elements
                    for (var i=1; i<elements.length; i=i+2) {
                        //add element to the array
                        returnArray[returnArray.length] = elements[i];
                    }

                    //return array of odd elements in the class
                    return returnArray;
                } else if (index == "even") {
                    //array of elements that are even
                    var returnArray = [];

                    //array of all elements in that class
                    var elements = document.getElementsByClassName(className);

                    //pick even elements
                    for (var i=0; i<elements.length; i=i+2) {
                        returnArray[returnArray.length] = elements[i];
                    }

                    //return array of even elements in the class
                    return returnArray;
                } else {
                    //given index is a number
                    index = Number(index);

                    //return the wanted element
                    return document.getElementsByClassName(className)[index];
                }
            } else {
                //return all elements of that class
                return document.getElementsByClassName(className);
            }
        } else { //tagname

            //if elem includes any index like [2], [odd] or [even]
            if (elem.includes("[") && elem.includes("]")) {
                var indexStart = elem.indexOf("[");
                var indexEnd = elem.indexOf("]");
                var index = elem.slice(indexStart+1, indexEnd);

                var tagName = elem.slice(0, indexStart);

                if (index == "odd") { //odd
                    //the array of odd elements of that tagname
                    var returnArray = [];

                    //all elements of that tagname
                    var elements = document.getElementsByTagName(tagName);

                    //pick all odd elements
                    for (var i=1; i<elements.length; i=i+2) {
                        returnArray[returnArray.length] = elements[i];
                    }

                    //return all odd elements of that tagname
                    return returnArray;
                } else if (index == "even") { //even
                    //the array of even elements of that tagname
                    var returnArray = [];

                    //all elements of that tagname
                    var elements = document.getElementsByTagName(tagName);

                    //pick all even elements
                    for (var i=0; i<elements.length; i=i+2) {
                        returnArray[returnArray.length] = elements[i];
                    }

                    //return all even elements of that tagname
                    return returnArray;
                } else { //number
                    //return the wanted element
                    return document.getElementsByTagName(tagName)[index];
                }
            } else {
                //return all elements of the tagname
                return document.getElementsByTagName(elem);
            }
        }
    }



    //add or remove class of an element
    c(id, add, className) {
        //param id (str), id/class[index]/tagname[index] of the wanted element
        //param add (boolean), true=add class; false=remove class (if empty, function returns current value)
        //param className (str), class that will be added/removed

        if (add == undefined) {
            //return document.getElementById(id).classList;
            return pl.e(id).classList;
        } else {
            if (add == true) {
                //document.getElementById(id).classList.add(className);
                pl.e(id).classList.add(className);
            } else if (add == false) {
                //document.getElementById(id).classList.remove(className);
                pl.e(id).classList.remove(className);
            }
        }
    }



    //get or set innerHTML/value of an element
    val(id, newValue) {
        //param id (str), id/class[index]/tagname[index] of the wanted element
        //param newValue (str), new value that will be set to the element (if empty, function returns current value)

        //list of elements that we use value with, otherwise innerHTML
        var values = ["input", "textarea"];

        //get wanted element
        //var elem = document.getElementById(id);
        var elem = pl.e(id);

        //check if we sould use value insted of innerHTML
        if ( values.includes(elem.nodeName.toLowerCase()) ) {
            //use value

            if (newValue == undefined) {
                return elem.value;
            } else {
                elem.value = newValue;
            }
        } else {
            //use innerHTML

            if (newValue == undefined) {
                return elem.innerHTML;
            } else {
                elem.innerHTML = newValue;
            }
        }
    }



    //get attribute of an element
    attr(id, attr, newValue) {
        //param id (str), id/class[index]/tagname[index] of the wanted element
        //param attr (str), wanted attribute
        //param newValue (any), new value of the wnated attribute (if empty, function returns current value)

        var elem = pl.e(id);

        //if new value is not set
        if (newValue == undefined) {
            //return current value
            //return document.getElementById(id).getAttribute(attr);
            return elem.getAttribute(attr);
        } else {
            //set new value
            //document.getElementById(id).setAttribute(attr, newValue);
            elem.setAttribute(attr, newValue);
        }
    }



    //get style property of an element
    css(id, property, newValue) {
        //param id (str), id on the wanted element
        //param property (str), wanted style property
        //param newValue (str), new value of the property (if empty, function returns current value)

        //var elem = document.getElementById(id);
        var elem = pl.e(id);

        if (newValue == undefined) {
            return window.getComputedStyle(elem)[property];
        } else {
            elem.style[property] = newValue;
        }
    }



    //set addEventListener to an element
    ael(id, event, func) {
        //param id (str), id/class[index]/tagname[index] of the wanted element
        //param event (str), event that triggers the function
        //param func (function), function that will be called

        //document.getElementById(id).addEventListener(event, func);
        pl.e(id).addEventListener(event, func);
    }



    //set an interval for an element
    intvl(identifier, interval, func, firstNow, rounds) {
        //param identifier (str), unique name of the interval
        //param interval (int), milliseconds between two rounds
        //param func (str), name of the function that will be called every round
        //param firstNow (boolean), true=first round will be not immediately; false=first round will be done after param interval time
        //param rounds (int), how many round will be done (empty = infinity)

        //chack if identifier is not free
        if (intvlIDs.includes(identifier) == true) {
            return;
        }

        //set interval
        intvlVars[intvlVars.length] = setInterval(function() {
            intvlRound(identifier); //call handler
        }, interval);

        //save the unique name
        intvlIDs[intvlIDs.length] = identifier;

        //save the function name
        intvlFuncs[intvlFuncs.length] = func;

        //save round limit
        intvlRounds[intvlRounds.length] = rounds;
        //not any rounds done yet
        intvlRoundsDone[intvlRoundsDone.length] = 0;

        //if first round will be done now
        if (firstNow == true) {
            //call handler
            intvlRound(identifier);
        }
    }



    //order an array by another array
    order(arr1, arr2) {
        //param arr1 (array, all items int), the array that has the integers that will define the order
        //param arr2 (array, all items any), the array that will be ordered

        //find the lowerst value in arr1
        var lowest = arr1[0];
        for (var i=0; i<arr1.length; i++) {
            if (arr1[i] < lowest) {
                lowest = arr1[i];
            }
        }
        //start from the lowest value
        var i = lowest;

        //the ordered array of arr2
        var returnArray = [];

        //loop trough numbers (starting from the lowest of arr1) until all have been found
        while (true) {
            //if arr1 contains the number of this round
            if (arr1.includes(i)) {
                //where the number of this round is located in the arr1
                var index = arr1.indexOf(i);

                //add the item of the same index in arr2 to the final array
                returnArray[returnArray.length] = arr2[index];
            }

            //next round
            i++;

            //if all items have been ordered
            if (returnArray.length == arr2.length) {
                //exit while loop
                break;
            }
        }

        //return ordered array
        return returnArray;
    }



    //set of actions for elements
    act(id, action) {
        //param id (str), id/class[index]/tagname[index] of the wanted element
        //param action (str), which action will be done
            // hide, show, toggle

        var elem = pl.e(id);

        if (action == "hide") {
            //document.getElementById(id).style.display = "none";
            elem.style.display = "none";
        } else if (action == "show") {
            //document.getElementById(id).style.display = "block";
            elem.style.display = "block";
        } else if (action == "toggle") {
            //var display = document.getElementById(id).style.display;
            var display = elem.style.display;
            if (display != "none") {
                //document.getElementById(id).style.display = "none";
                elem.style.display = "none";
            } else {
                //document.getElementById(id).style.display = "block";
                elem.style.display = "block";
            }
        } else if (action == "invisible") {
            //document.getElementById(id).style.visibility = "hidden";
            elem.style.visibility = "hidden";
        } else if (action == "visible") {
            //document.getElementById(id).style.visibility = "visible";
            elem.style.visibility = "visible";
        } else if (action == "visToggle") {
            //var visibility = document.getElementById(id).style.visibility;
            var visibility = elem.style.visibility;
            if (visibility != "hidden") {
                //document.getElementById(id).style.visibility = "hidden";
                elem.style.visibility = "hidden";
            } else {
                //document.getElementById(id).style.visibility = "visible";
                elem.style.visibility = "visible";
            }
        }
    }



    //set of animations for elements
    ani(id, animation, time) {
        //param id (str), id/class[index]/tagname[index] of the wanted element
        //param animation (str), aniamtion that will be played
        //param time (int/float), animation duration in seconds

        var elem = pl.e(id);
        if (animation == "fade-out") {
            //document.getElementById(id).style.transition = "opacity "+time+"s";
            elem.style.transition = "opacity "+time+"s";
            //document.getElementById(id).style.opacity = "0";
            elem.style.opacity = "0";
        } else if (animation == "fade-in") {
            //document.getElementById(id).style.transition = "opacity "+time+"s";
            elem.style.transition = "opacity "+time+"s";
            //document.getElementById(id).style.opacity = "1";
            elem.style.opacity = "1";
        }
    }



    //search from array
    search(contentArray, keyword, method) {
        //param contentArray (array, items str), the array which items str will be searched
        //param keyword (str), the keyword that will be searched from contentArray's items
        //param method (int), method that will be used
            // 1=complete equivalence at anywhere in the item of the contentArray
            // 2=complete equivalence at the beginning of the item of the contentArray
            // 3=item and keyword are exactly the same

        //define the array that will be returned (will contain all equivalence items of contentArray)
        var returnArray = [];

        if (method == 1) {
            //if chosen complete equivalence method

            //loop trough all contentArray items
            for (var i=0; i<contentArray.length; i++) {
                //if item contains keyword
                if (contentArray[i].includes(keyword) == true) {
                    //add item to array that will be returned
                    returnArray[returnArray.length] = contentArray[i];
                }
            }
            //return array
            return returnArray;
        } else if (method == 2) {
            //if chosen complete equivalence at the beginning method

            if (keyword == "") {
                //return array
                return contentArray;
            } else {
                //loop trough items
                for (var i=0; i<contentArray.length; i++) {

                    //for every item, check if keyword's and item's first, second, third ect chars are the same
                    for (var j=0; j<keyword.length; j++) {
                        //if chars are the same
                        if (keyword.charAt(j) == contentArray[i].charAt(j)) {
                            //okay, continue

                            //if the last char of the keyword = item starts with the keyword
                            if (j == keyword.length-1) {
                                returnArray[returnArray.length] = contentArray[i];
                            }
                        } else {
                            //item doesn't start with the keyword

                            //next item
                            break;
                        }
                    }
                }
            }

            //return array
            return returnArray;
        } else if (method == 3) {
            //if chosen exaclty the same method

            for (var i=0; i<contentArray.length; i++) {
                if (contentArray[i] == keyword) {
                    returnArray[returnArray.length] = keyword;
                }
            }

            return returnArray;
        }
    }
}



var pl = new Pl();