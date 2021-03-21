
import React from 'react';
import { Link } from 'react-router-dom';

class Register extends React.component{
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: '',
                email: '',
                preg: '',
                res:''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.username && user.password && user.email && user.preg && user.res) {
            this.props.register(user);
        }
    }

    render() {
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="firstName">UserName</label>
                        <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                        {submitted && !user.username &&
                        <div className="help-block">UserName is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                        <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                        {submitted && !user.email &&
                        <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.preg ? ' has-error' : '')}>
                        <label htmlFor="preg">Preg</label>
                        <input type="text" className="form-control" name="preg" value={user.preg} onChange={this.handleChange} />
                        {submitted && !user.preg &&
                        <div className="help-block">Preg is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.res ? ' has-error' : '')}>
                        <label htmlFor="res">Res</label>
                        <input type="text" className="form-control" name="res" value={user.res} onChange={this.handleChange} />
                        {submitted && !user.res &&
                        <div className="help-block">Res is required</div>
                        }
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
