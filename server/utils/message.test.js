var expect=require('expect');

var{generateMessage, generateLocationMessage}=require('./message.js');

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

describe('generateLocationMessage', ()=>{
    it('should generate correct location object', ()=>{
        var from ='Deb';
        var latitude=15;
        var longitude=19;
        var url='https://www.google.com/maps?q=15,19';
        var message=generateLocationMessage(from, latitude, longitude);

        expect(typeof message.createdAt).toBe('number');
        expect(message.from).toContain(from);
        expect(message.url).toContain(url);
        
    });

});