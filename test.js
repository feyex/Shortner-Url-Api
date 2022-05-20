const supertest = require("supertest");
const should = require("should");

const server = supertest.agent("http://localhost:5000");

describe("Shortner Api Url test", () => {

    it("should submit Url and create a short code if shortUrl not provided ", (done) => {
        let request = {
            longUrl: 'https.test.com'
        }

        server
            .post("/v1")
            .send(request)
            .expect(201)
            .end((err, res) => {
                res.status.should.equal(201);
                res.body.message.should.equal('URL successfully submitted');
                res.body.url.should.equal(request.longUrl);

                done();
            });
    });

    it("should submit the request sucessfully ", (done) => {
        let request = {
            longUrl: 'http.tests.com',
            shortUrl: '94Rwety'
        }

        server
            .post("/v1")
            .send(request)
            .expect(201)
            .end((err, res) => {
                res.status.should.equal(201);
                res.body.message.should.equal('URL successfully submitted');
                res.body.url.should.equal(request.longUrl);
                res.body.shortCode.should.equal(request.shortUrl);
                done();
            });
    });

    it("should return Url details if Url already exist ", (done) => {
        let request = {
            longUrl: 'http.tests.com',
            shortUrl: '94Rwety'
        }

        server
            .post("/v1")
            .send(request)
            .expect(200)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.message.should.equal('URL already exists');
                res.body.url.shortUrl.should.equal(request.shortUrl);
                res.body.url.longUrl.should.equal(request.longUrl);
                done();
            });
    });

    it("should return error message if shortCodeUrl provided is less than 4 in length ", (done) => {
        let request = {
            longUrl: 'www.aatests.com',
            shortUrl: '94R'
        }

        server
            .post("/v1")
            .send(request)
            .expect(400)
            .end((err, res) => {
                res.status.should.equal(400);
                console.log(res)
                res.body.message.should.equal('Short Code Url Value Cannot be less than four in length');
                done();
            });
    });

    it("should return success redirect if short code exist", (done) => {
        let shortCode = '94Rwety'
        server
            .get("/v1/" + shortCode)
            .expect("Content-type", /json/)
            .expect(302)
            .end((err, res) => {
                res.status.should.equal(302);
                done();
            });
    });

    it("should return 404 if short code does not found", (done) => {
        let shortCode = 'a1yhtes'
        server
            .get("/v1/" + shortCode)
            .expect(404)
            .end((err, res) => {
                res.status.should.equal(404);
                res.text.should.equal('"Cannot Access Url / Short Code Url Not found"');
                done();
            });
    });

    it("should return all details of the existing shortCodes", (done) => {
        let shortCode = '94Rwety'
        server
            .get("/v1/" + shortCode + "/stats")
            .expect(200)
            .end((err, res) => {
                res.status.should.equal(200);
                res.body.url.should.equal('http.tests.com');
                res.body.shortCode.should.equal(shortCode);
                done();
            });
    });
})