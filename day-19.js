const fs = require('fs');
const fileName = "data/day-19-input.txt";

// px{a<2006:qkq,m>2090:A,rfg}
// result = {
//    name: "px",
//    rules: [
//        { attribute: "a", operator: "<", condition: 2006, next: "qkq" },
//        { attribute: "m", operator: ">", condition: 2090, next: "A" },
//        { next: "rfg", isFinal: true  }
//    ]
// }
function parseWorkflow(workflow) {
    let openBraceIndex = workflow.indexOf("{");
    let closeBraceIndex = workflow.indexOf("}");
    let name = workflow.substring(0, openBraceIndex);
    let rawRules = workflow.substring(openBraceIndex + 1, closeBraceIndex).split(",");
    let rules = [];

    for(let i = 0; i < rawRules.length; i++) {
        let lessThanOperatorIndex = rawRules[i].indexOf("<");
        let greaterThanOperatorIndex = rawRules[i].indexOf(">");
        if(lessThanOperatorIndex != -1) {
            let colonIndex = rawRules[i].indexOf(":");
            rules.push({
                attribute: rawRules[i].substring(0, lessThanOperatorIndex),
                operator: "<",
                isFinal: false,
                condition: Number(rawRules[i].substring(lessThanOperatorIndex + 1, colonIndex)),
                next: rawRules[i].substring(colonIndex + 1)
            });
        } else if (greaterThanOperatorIndex != -1) {
            let colonIndex = rawRules[i].indexOf(":");
            rules.push({
                attribute: rawRules[i].substring(0, greaterThanOperatorIndex),
                operator: ">",
                isFinal: false,
                condition: Number(rawRules[i].substring(greaterThanOperatorIndex + 1, colonIndex)),
                next: rawRules[i].substring(colonIndex + 1)
            });
        } else {
            rules.push({
                next: rawRules[i],
                isFinal: true
            });
        }
    }

    return {
        name: name,
        rules: rules
    };

}

// {x=787,m=2655,a=1222,s=2876}
// result = {
//    x: 787,
//    m: 2655,
//    a: 1222,
//    s: 2876
// }
function parseDatum(datum) {
    let openBraceIndex = datum.indexOf("{");
    let closeBraceIndex = datum.indexOf("}");
    let rawAttributes = datum.substring(openBraceIndex + 1, closeBraceIndex).split(",");
    let attributes = {};

    for(let i = 0; i < rawAttributes.length; i++) {
        let equalIndex = rawAttributes[i].indexOf("=");
        let attribute = rawAttributes[i].substring(0, equalIndex);
        let value = Number(rawAttributes[i].substring(equalIndex + 1));
        attributes[attribute] = value;
    }

    return attributes
}

function processAllData(workflows, data) {
    let results = 0;
    let accepted = [];
    let rejected = [];
    for(let i = 0; i < data.length; i++) {
        //console.log(`Processing ${JSON.stringify(data[i])}`);
        //console.log("Starting workflow: in")
        let workflow = workflows["in"];
        let complete = false;
        let ruleIndex = 0;
        let transition = false;
        while(!complete) {
            let rule = workflow.rules[ruleIndex];
            ruleIndex++;
            if(rule.isFinal) {
                //console.log(`Final rule reached, switching to workflow ${rule.next}`);
                transition = true;
            } else {
                if(rule.operator == "<") {
                    if(data[i][rule.attribute] < rule.condition) {
                        //console.log(`Less than condition met, switching to workflow ${rule.next}`);
                        transition = true;
                    }
                } else if (rule.operator == ">") {
                    if(data[i][rule.attribute] > rule.condition) {
                        //console.log(`Greater than condition met, switching to workflow ${rule.next}`);
                        transition = true;
                    }
                }
            }

            if(transition) {
                if(rule.next == "A") {
                    //console.log("Accepted");
                    accepted.push(data[i]);
                    complete = true;
                } else if (rule.next == "R") {
                    //console.log("Rejected");
                    rejected.push(data[i]);
                    complete = true;
                } else {
                    workflow = workflows[rule.next];
                    ruleIndex = 0;
                    transition = false;
                }
            }
        }
    }

    results = accepted.reduce((accumulator, currentValue) =>  {
        return accumulator + currentValue["a"] + currentValue["m"] + currentValue["s"] + currentValue["x"];
    }, 0);

    return results;
}

function part1() {
    const file = fs.readFileSync(fileName, 'utf8');
    const lines = file.split(/\r?\n/);

    let workflows = {};
    let data = [];
    let gatherWorkflows = true;

    for(let i = 0; i < lines.length; i++) {
        if(lines[i] == "") {
            gatherWorkflows = false;
            continue;
        }

        if(gatherWorkflows) {
            let workflow = parseWorkflow(lines[i]);
            workflows[workflow.name] = workflow;
        } else {
            let datum = parseDatum(lines[i]);
            data.push(datum);
        }
    }

    //console.log(JSON.stringify(workflows, null, 4));
    //console.log(JSON.stringify(data, null, 4));

    let results = processAllData(workflows, data);
    console.log(`Part 1: ${results}`);
}

part1();