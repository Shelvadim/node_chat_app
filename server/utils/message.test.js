var expect=require('expect');

var{generateMessage}=require('./message.js');

describe('generateMessage', ()=>{
    it('should generate correct message object', ()=>{
        var from ='Jen';
        var text='some text';
        var message=generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message.from).toContain(from);
        expect(message.text).toContain(text);

    });

});