export default {
    "ROOT": {
        "Time": {
            "$": {
                "TimeStamp": "2016/07/26 16:05:48"
            }
        },
        "S": [{
            "$": {
                "Code": "BST",
                "N": "Baker Street."
            },
            "P": [{
                "$": {
                    "N": "Southbound - Platform 8",
                    "Code": "1",
                    "Next": "0"
                },
                "T": [{
                    "$": {
                        "S": "222",
                        "T": "17",
                        "D": "154",
                        "C": "-",
                        "L": "At Platform",
                        "DE": "Elephant and Castle"
                    }
                }, {
                    "$": {
                        "S": "213",
                        "T": "13",
                        "D": "154",
                        "C": "3:00",
                        "L": "At Edgware Road Platform 2",
                        "DE": "Elephant and Castle"
                    }
                }]
            }, {
                "$": {
                    "N": "Northbound - Platform 9",
                    "Code": "0",
                    "Next": "0"
                },
                "T": [{
                    "$": {
                        "S": "240",
                        "T": "13",
                        "D": "207",
                        "C": "0:30",
                        "L": "Approaching Baker Street",
                        "DE": "Harrow and Wealdstone"
                    }
                }, {
                    "$": {
                        "S": "224",
                        "T": "15",
                        "D": "369",
                        "C": "4:00",
                        "L": "At Oxford Circus Platform 4",
                        "DE": "Queen's Park"
                    }
                }]
            }]
        }]
    }
};
