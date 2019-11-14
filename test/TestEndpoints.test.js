const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

describe('Api Tests for Users endpoints', () => {

    it('POST service', async () => {
      const requestBody = {
        name: "Sandra",
        lastname: "Nino",
        idnumber: 1143874327
      };
  
      const response = await agent.post('http://localhost:4000/users').send(requestBody);
  
      expect(response.status).to.equal(statusCode.CREATED);
      expect(response.body.message).to.eql('A new user has been created');
      expect(response.body.user.name).to.eql(requestBody.name);
      expect(response.body.user.lastname).to.eql(requestBody.lastname);
      expect(response.body.user.idnumber).to.eql(requestBody.idnumber);
    });

    it('POST service with a user already created', async () => {
        const requestBody = {
          name: "Sandra",
          lastname: "Nino",
          idnumber: 1143874327
        };
            
        agent.post('http://localhost:4000/users').send(requestBody).then().catch(
            (response)=> {
                expect(response.status).to.equal(statusCode.BAD_REQUEST);
                expect(response.response.body.message).to.equal('A user has been created with that number');
            });
  
       
    });
      it('GET service', async () =>{
      const response = await agent.get('http://localhost:4000/users');
      expect(response.status).to.equal(200);
      expect(response.body.message).to.eql('A list of all users');

    });
});
