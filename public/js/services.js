'use strict';

angular.module('startupJobsApp')
        .constant("baseURL", "https://whispering-headland-40528.herokuapp.com/api/")
        .service('hnJobsFactory',
            ['$resource', 'baseURL', function($resource, baseURL) {
            this.getHnJobs = function() {
                return $resource(baseURL + "jobs/:id", null, {
                        'update': {
                            method: 'PUT'
                        },
                        'query': {
                            method: 'GET',
                            cache: true,
                            isArray: true
                        }
                    }); 
            };

            this.getHnCandidates = function() {
                return $resource(baseURL + "candidates/:id", null, {
                        'update': {
                            method: 'PUT'
                        },
                        'query': {
                            method: 'GET',
                            cache: true,
                            isArray: true
                        },
                    }); 
            };
        }])

        .service('dateLabelsFactory',
            ['$resource', 'baseURL', function($resource, baseURL) {
            var parseResponseDates = function(response) {
                // convert response.data to an array of Date
                var dates = [];
                var data = response.data;
                var key;
                var value;
                for (key in data) {
                    if (!data.hasOwnProperty(key) && // don't parse prototype or non-string props
                        toString.call(data[key]) !== '[object String]') continue;
                    value = Date.parse(data[key].month); // try to parse to date
                    if (value !== NaN) {
                        dates.push(new Date(value));
                    }
                }
                return dates;
            };

            this.getDateLabels = function() {
                return $resource(baseURL + "datelabels/:id", null, {
                    'query': {
                       method: 'GET',
                       cache: true,
                       isArray: true,
                       interceptor: {response: parseResponseDates}
                    },
                    'update': {
                       method: 'PUT'
                    }
                });
            };
        }])

        .service('rememberPositionService', function() {
            return {
                scrollTop: undefined
            };
        })

        .service('cacheStateService', function() {
            var setData = function(newPattern) {
                model.searchPattern = newPattern;
                console.log("searchPattern updated:", newPattern);
            }

            var model = {
                tab: 0,
                showJob: true, // show jobs or candidates
                filtType: undefined,
                filtMonth: undefined,
                searchPattern: undefined,
                setData: setData,
            };

            return model;
        })

;
