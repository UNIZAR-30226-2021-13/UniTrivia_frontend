
import React,{Component} from 'react';


class Register extends React.Component{
        render() {
        
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' }>
                        <label htmlFor="firstName">UserName</label>
                        <input type="text" className="form-control" name="username"  />
                        
                    </div>
                    <div className={'form-group' }>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password"  />
                        
                    </div>
                    <div className={'form-group' }>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email"  />
                        
                    </div>
                    <div className={'form-group' }>
                        <label htmlFor="preg">Preg</label>
                        <input type="text" className="form-control" name="preg"  />
                        
                    </div>
                    <div className={'form-group' }>
                        <label htmlFor="res">Res</label>
                        <input type="text" className="form-control" name="res"  />
                        
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>

                    </div>
                </form>
            </div>
        );
    }
}

export default Register;
