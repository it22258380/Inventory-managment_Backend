import User from "../Models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//add user
export function AddUser(req,res){
    
    const UserData = req.body;
    //encrypt the password
    UserData.password = bcrypt.hashSync(UserData.password,10);

    const newUser = new User(UserData);
    newUser.save().then(
        ()=>{
            res.status(200).json('User Added successfully');
        }
     ).catch(
            (err)=>{
                res.status(400).json('Error: '+err);
            }
     )
 }

///user login
export function LoginUser(req,res){
    const data=req.body;
    //find user by email
    User.findOne(
        {
            email:data.email
        }
    ).then(
        (user)=>{
            if(user == null ){
                res.status(400).json('User not found');
            }else{
                //compare passwords
                const isPasswordCorrect = bcrypt.compareSync(data.password,user.password);

                if(isPasswordCorrect){
                            const token = jwt.sign(
                                {
                                    firstName:user.firstname,
                                    lastName:user.lastname,
                                    email:user.email,
                                    role:user.role
                                }, process.env.JWT_SECRET
                                
                            )


                    res.status(200).json({
                       message: 'Login successful',token:token
                    });
                }else{
                    res.status(400).json('Invalid password');
                }
            }
        }
    )
 }


// edit profile
export function editUser(req, res) {
    if (req.user == null){
        return res.status(400).json('You are not authorized to view this page');
    }

    const id = req.params.id;
    const updatedData = req.body;
    
    User.findById(id).then((user) => {
        if (!user) {
            return res.status(404).json({ message:'User not found' });
        }

        // Check if the logged-in user is trying to edit their own profile
        if (user.email === req.user.email) {
            // If the email matches, update the user
            User.findByIdAndUpdate(id, updatedData, { new: true })
                .then(updatedUser => res.status(200).json({ message: 'User Profile updated successfully', user: updatedUser }))
                .catch(err => res.status(400).json({ message:"Error updating User", error: err }));
        } else {
            return res.status(400).json({ message: 'You are not authorized to edit this user' });
        }
    }).catch((err) => {
        return res.status(400).json({ message: 'Error finding user', error: err });
    });
}
