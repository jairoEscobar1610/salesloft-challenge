/**
 * Jaro-Wrinker similarity tests
 * @param s1 string 1
 * @param s2 string 2
 * @returns Jaro-Wrinker similarity (preference for prefixes)
 */
export function jaroWrinkerTest(s1: string, s2: string): number {
    // Return 0 if any of the strings are empty/null/undefined
    if (!s1 || !s2) {
        return 0;
    }

    // Exact match
    if (s1 === s2) {
        return 1;
    }

    // Calculate the max distance based on the formula: floor([max(|s1|,|s2|)/2]) - 1
    const maxDistance: number = (Math.floor(Math.max(s1.length, s2.length) / 2)) - 1;

    // Matches
    let matches: number = 0;

    // Hash arrays for each string matching
    /* tslint:disable-next-line */
    let s1MatchHash = [], s2MatchHash = [];
    s1MatchHash.length = s1.length;
    s1MatchHash.fill(0);

    s2MatchHash.length = s2.length;
    s2MatchHash.fill(0);

    // First string traversing
    for (let i = 0; i < s1.length; i++) {
        const lowerBound = (i >= maxDistance) ? i - maxDistance : 0,
            upperBound = (i + maxDistance <= s2.length) ? (i + maxDistance) : (s2.length - 1);
        // Check for matches with second string
        /* tslint:disable-next-line */
        for (let j = lowerBound; j <= upperBound; j++) {
            // Test match
            if (s1.charAt(i) === s2.charAt(j) && s2MatchHash[j] === 0) {
                // Set match position for each string: s1(i), s2(j)
                s1MatchHash[i] = 1;
                s2MatchHash[j] = 1;
                matches++;
                break;
            }
        }
    }

    // Return 0 if there where no matches
    if (matches === 0) {
        return 0;
    }

    // Calculate transpositions (t/2)
    let t = 0;
    let s2Pointer: number = 0;

    // Calculate occurences where one character matches between two other matched characters indexes
    for (let i = 0; i < s1.length; i++) {
        if (s1MatchHash[i] === 1) {
            // Next match in s2
            while (s2MatchHash[s2Pointer] === 0) {
                s2Pointer++;
            }
            // Check for transposition
            if (s1.charAt(i) !== s2.charAt(s2Pointer++)) {
                ++t;
            }
        }
    }

    // Calculate Jaro similarity formula: 1/3( m/|s1| + m/|s2| + (m-t)/m )
    let weight = ((matches / s1.length) + (matches / s2.length) + ((matches - (t / 2)) / matches)) / 3,
        lPrefix = 0;
    const p = 0.1; // Constant scaling factor
    // Calculate Jaro-Wrinker formula if the weight is higher than 0.7: dw = dj +(l_prefix(1-dj))
    if (weight > 0.7) {
        while (s1[lPrefix] === s2[lPrefix] && lPrefix < 4) {
            ++lPrefix;
        }

        weight = weight + lPrefix * p * (1 - weight);
    }
    return weight;
}


/**
 * Group possible duplicates for the given array of strings
 * @param contentArray raw content array
 * @param mapFunction transformation function to obtain the string arrays
 * @param compareFunction comparator function to obtain similarity
 * @param threshold limit to be considered 'possible duplicate'
 * @returns resultSet reference
 */
export function stringSimilarityArray(contentArray: any[],
    mapFunction: (value: any, index: number) => string,
    compareFunction: (s1: string, s2: string) => number,
    threshold: number = 0.95): Promise<any> {
    return new Promise((resolve, reject) => {
        try {
            /* tslint:disable-next-line */
            let resultSet: any = {};
            resultSet.groups = [];
            const stringArray = contentArray
                // Clear the data
                .map(mapFunction);
            // Fill hash array
            const hashArray = [];
            let currentGroup = [];
            hashArray.length = stringArray.length;
            hashArray.fill(0);
            // Iterate over the string array
            stringArray.forEach((currentText, index) => {
                // Skip already grouped emails
                if (!hashArray[index]) {
                    hashArray[index] = 1;
                    currentGroup = [currentText];
                    // Check for the next strings in the array
                    for (let j = index + 1; j < stringArray.length; j++) {
                        // If the string has not been marked yet
                        if (!hashArray[j]) {
                            // If overpasses the threshold, add them to the group
                            if (compareFunction(currentText, stringArray[j]) >= threshold) {
                                currentGroup.push(stringArray[j]);

                                // Optimize checking by marking string that are part of existing groups
                                hashArray[j] = 1;
                            }
                        }
                    }

                    // Consider duplicates only if the group is bigger than 1
                    if (currentGroup.length > 1) {
                        resultSet.groups.push(currentGroup);
                    }
                }

            });
            resolve(resultSet);

        } catch (exception) {
            reject(exception);
        }


    });
}