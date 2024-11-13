const fs = require('fs');
const fileName = "data/day-19-test.txt";

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
                next: rawRules[i].substring(colonIndex + 1),
                isGoal: rawRules[i].substring(colonIndex + 1) == "A"
            });
        } else if (greaterThanOperatorIndex != -1) {
            let colonIndex = rawRules[i].indexOf(":");
            rules.push({
                attribute: rawRules[i].substring(0, greaterThanOperatorIndex),
                operator: ">",
                isFinal: false,
                condition: Number(rawRules[i].substring(greaterThanOperatorIndex + 1, colonIndex)),
                next: rawRules[i].substring(colonIndex + 1),
                isGoal: rawRules[i].substring(colonIndex + 1) == "A"
            });
        } else {
            rules.push({
                next: rawRules[i],
                isGoal: rawRules[i] == "A",
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

function activationRange(rule) {
    let min = 1;
    let max = 4000;
    let attribute = rule.attribute;

    if(rule.operator == "<") {
        max = rule.condition - 1;
    } else if (rule.operator == ">") {
        min = rule.condition + 1;
    }

    return {
        attribute,
        min,
        max
    }
}

function skipRange(rule) {
    let min = 1;
    let max = 4000;
    let attribute = rule.attribute;

    if(rule.operator == "<") {
        min = rule.condition;
    } else if (rule.operator == ">") {
        max = rule.condition;
    }

    return {
        attribute,
        min,
        max
    }
}

function chainActivationRange(ranges) {
    let results = {
        x: { min: 1, max: 4000 },
        m: { min: 1, max: 4000 },
        a: { min: 1, max: 4000 },
        s: { min: 1, max: 4000 }
    }

    let keys = ["x", "m", "a", "s"]

    for(let i = 0; i < ranges.length; i++) {
        let range = ranges[i];

        //console.log(range);

        for(let i = 0; i < keys.length; i++) {
            key  = `${keys[i]}`
            if(results[key].min < range[key].min) {
                results[key].min = range[key].min;
            }

            if(results[key].max > range[key].max) {
                results[key].max = range[key].max;
            }
        }
    }

    return results;
}

function workflowActivationRange(workflow, ruleStartIndex, memo = {}) {
    if(memo[`${workflow.name}-${ruleStartIndex}`]) {
        return memo[`${workflow.name}-${ruleStartIndex}`];
    }

    let results = {
        isGoal: false,
        workflowName: workflow.name,
        ruleStartIndex: ruleStartIndex,
        x: { min: 1, max: 4000 },
        m: { min: 1, max: 4000 },
        a: { min: 1, max: 4000 },
        s: { min: 1, max: 4000 }
    }

    for(let i = ruleStartIndex; i >= 0; i--) {
        let rule = workflow.rules[i];
        let range = {};

        if(i == ruleStartIndex && rule.isGoal) {
            results.isGoal = true;
        }

        if (rule.isFinal) {
            continue;
        } else if (i == ruleStartIndex) {
            range = activationRange(rule);
        } else {
            range = skipRange(rule);
        }

        if(results[range.attribute].min < range.min) {
            results[range.attribute].min = range.min;
        }

        if(results[range.attribute].max > range.max) {
            results[range.attribute].max = range.max;
        }
    }

    memo[`${workflow.name}-${ruleStartIndex}`] = results;

    return results;
}



function findWorkflows(workflows, next) {
    let rules = [];

    for(w in workflows) {
        let workflow = workflows[w];
        for(let j = 0; j < workflow.rules.length; j++) {
            let rule = workflow.rules[j];
            if(rule.next == next) {
                rules.push({
                    workflowName: workflow.name,
                    isFinal: rule.isFinal,
                    attribute: rule.attribute,
                    operator: rule.operator,
                    condition: rule.condition,
                    next: rule.next,
                    index: j,
                    isGoal: rule.next == "A"
                });
            }
        }
    }

    //console.log(`Found ${rules.length} rules`);
    //console.log(JSON.stringify(rules, null, 4));
    return rules;
}

/*function findWorkFlowRoot(workflow, ruleStartIndex, memo = {}) {

}*/

function processWorkflows(workflows, rules, memo) {
    let results = [];
    for(let i = 0; i < rules.length; i++) {
        let rule = rules[i];
        results.push(workflowActivationRange(workflows[rule.workflowName], rule.index, memo));
    }

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

function combinations(ranges) {
    let x = ranges["x"].max - ranges["x"].min + 1;
    let m = ranges["m"].max - ranges["m"].min + 1;
    let a = ranges["a"].max - ranges["a"].min + 1;
    let s = ranges["s"].max - ranges["s"].min + 1;

    return x * m * a * s;
}

function part2() {
    const file = fs.readFileSync(fileName, 'utf8');
    const lines = file.split(/\r?\n/);

    let workflows = {};

    for(let i = 0; i < lines.length; i++) {
        if(lines[i] == "") {
            gatherWorkflows = false;
            i = lines.length;
            continue;
        }
        
        let workflow = parseWorkflow(lines[i]);
        workflows[workflow.name] = workflow;
    }

    let ranges = {
        from: "permutations",
        to: "in",
        x: { min: 1, max: 4000 },
        m: { min: 1, max: 4000 },
        a: { min: 1, max: 4000 },
        s: { min: 1, max: 4000 }
    };
    let initialCombinations = combinations(ranges);
    let processQueue = [];
    processQueue.push("in");
    console.log(`${ranges.from} [${initialCombinations}] ${ranges.to}`)
    while(processQueue.length > 0) {
        let workflowName = processQueue.shift();
        let workflow = workflows[workflowName];


        for(let i = 0; i < workflow.rules.length; i++) {
            let rule = workflow.rules[i];
            let positiveRange = activationRange(rule);
            let negativeRange = skipRange(rule);
            if(!rule.isFinal) {
                ranges[positiveRange.attribute].min = positiveRange.min;
                ranges[positiveRange.attribute].max = positiveRange.max;
            }

            let positiveCombinations = combinations(ranges);
            console.log(`${workflowName} [${positiveCombinations}] ${rule.next}`);

            
            ranges[negativeRange.attribute].min = negativeRange.min;
            ranges[negativeRange.attribute].max = negativeRange.max;
        }
    }
    //console.log(JSON.stringify(workflows, null, 4));

    /*acceptanceRules = findWorkflows(workflows, "A");
    //console.log(JSON.stringify(acceptanceRules, null, 4));
    let memo = {};
    let processedWorkflows = processWorkflows(workflows, acceptanceRules, memo);

    let processQueue = [];
    for(let i = 0; i < processedWorkflows.length; i++) {
        processQueue.push(processedWorkflows[i]);
    }

    while(processQueue.length > 0) {
        let workflow = processQueue.shift();
        //console.log("--------------------");
        //console.log(`Processing ${workflow.workflowName}`)
        //console.log(JSON.stringify(workflow, null, 4));
        let relatedWorkflows = findWorkflows(workflows, workflow.workflowName);
        //console.log(`Found ${relatedWorkflows.length} related workflows`);
        memo[`${workflow.workflowName}-${workflow.ruleStartIndex}`].previousWorkFlows = [];
        if(relatedWorkflows.length > 0) {
            memo[`${workflow.workflowName}-${workflow.ruleStartIndex}`].previousWorkFlows = relatedWorkflows.map(x => `${x.workflowName}-${x.index}`);
            processedWorkflows = processWorkflows(workflows, relatedWorkflows, memo);
            for(let i = 0; i < processedWorkflows.length; i++) {
                processQueue.push(processedWorkflows[i]);
            }
        }
        //console.log(JSON.stringify(relatedWorkflows, null, 4));
    }

    let goals = [];
    for(key in memo) {
        if(memo[key].isGoal) {
            goals.push(key);
        }
    }

    for(let i = 0; i < goals.length; i++) {
        let steps = [];
        let ranges = [];
        steps.push(goals[i]);
        ranges.push(memo[goals[i]]);
        let reachedInState = false;
        while(!reachedInState) {
            let previousWorkflows = memo[goals[i]].previousWorkFlows;
            if(previousWorkflows.length > 0) {
                ranges.push(...previousWorkflows.map(x => memo[x]));
                steps.push(...previousWorkflows);
                goals[i] = previousWorkflows[0];
            } else {
                reachedInState = true;
            }
        }

        let range = chainActivationRange(ranges);
        console.log(steps.join(" -> "));
        console.log(range);
        //console.log(ranges);
    }*/
}

part1();
part2();