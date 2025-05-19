const express = require('express');
const server = express();

const courses = ['Node JS', 'Java Script', 'PHP', 'React', 'VUE js'];

server.use((req, res, next) => {
    console.log(`URL Called: ${req.url}`);

    return next();
});

function checkCourse(req, res, next) {

    if (!req.body.newCourse) {

        return res.status(400).json({ 
            error: 'Course name is required in format { newCourse: "Course Name" }'
        });
    }
};

function checkIDCourse(req, res, next) {
    const course = courses[req.params.index];

    if (!course) {
        return res.status(400).json({
            error: "Course not exist in this ID requested"
        });
    }

    return next();
};

server.get('/curso', (req, res) => {
    return res.json(courses);
});

server.get('/curso:index', checkIDCourse, (req, res) => {
    const { index } = req.params;

    return res.json(courses[index]);
});

server.post('/curso', checkCourse,(req, res) => {
    const { name } = req.body;

    courses.push(name);

    return res.json(courses);
});

server.put('/curso/:index', checkIDCourse, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    courses[index] = name;

    return res.json(courses);
});

server.delete('/curso/:index', (req, res) => {
    const { index } = req.params;

    courses.splice(index, 1);
    
    return res.json({ message: "Course deleted successifully" });
})

server.listen(3000);

