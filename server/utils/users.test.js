const expect=require('expect');

const{Users}=require('./users.js');

describe('Users', ()=>{
    var users;

    beforeEach(()=>{
        users=new Users();
        users.users=[{
            id:'1',
            name:'Yury',
            room:'Room2'
        },{
            id:'2',
            name:'Make',
            room:'Room3'
        },{
            id:'3',
            name:'Ssss',
            room:'Room2'
        }]
    });

    it('should add user', ()=>{
        var users= new Users();
        var user={
            id:'123',
            name:'Vadim',
            room:'Room1'
        }

        var resUser=users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);       

    });

    it('should remove user', ()=>{
        var userId= '1';
        var user=users.removeUser(userId);

        expect(user.id).toEqual(userId);
        expect(users.users.length).toEqual(2);
    });

    it('should not remove user', ()=>{
        var userId= '99';
        var user=users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toEqual(3);
    });

    it('should find user', ()=>{
        var userId= '2';
        var user=users.getUser(userId);
        expect(user.id).toEqual(userId);
        
    });

    it('should not find user', ()=>{
        var userId= '99';
        var user=users.getUser(userId);
        expect(user).toBeFalsy();
        
        
    });



    it('should return users list for Room2', ()=>{
        var userList= users.getUserList('Room2');

        expect(userList).toEqual(['Yury', 'Ssss']);
        
    });

    it('should return users list for Room3', ()=>{
        var userList= users.getUserList('Room3');

        expect(userList).toEqual(['Make']);
        
    });

});