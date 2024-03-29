import React from 'react';
import '../../styles/registerStyles.css';
import RegisterGymService from "../../service/business/RegisterGymService";

const GymForm = () => {
    const {
        formData,
        handleInputChange,
        imageChange,
        handleSubmit,
        getFieldClassName,
        id,
        gym,
    } = RegisterGymService();

    if (id && Array.isArray(gym)) {
        return <div>Loading</div>
    }

    return (
        <div className="container">
            <div className="col-8 offset-md-2 mb-2">
                <h1 className="text-center">{id ? 'Edit' : 'Register'} Gym</h1>
            </div>
            <hr/>
            <div>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className={getFieldClassName('name')}
                                placeholder="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="address" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                className={getFieldClassName('address')}
                                placeholder="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="date_opened" className="form-label">
                                Date opened
                            </label>
                            <input
                                type="date"
                                className={getFieldClassName('date_opened')}
                                placeholder="Date opened"
                                name="date_opened"
                                value={formData.date_opened}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="phone_number" className="form-label">
                                Phone number
                            </label>
                            <input
                                type="text"
                                className={getFieldClassName('phone_number')}
                                placeholder="Phone number"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-6'>
                            <label htmlFor="cover_image" className="form-label">
                                Cover Image
                            </label>
                            <input
                                type="file"
                                className={getFieldClassName('cover_image')}
                                id="cover_image"
                                name="cover_image"
                                onChange={imageChange}
                                required
                            />
                        </div>
                        <div className='col-6'>
                            <label htmlFor="cover_image" className="form-label">
                                Images
                            </label>
                            <input
                                type="file"
                                className={getFieldClassName('images')}
                                id="cover_image"
                                name="cover_image"
                                onChange={imageChange}
                                multiple
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className='input-group'>
                            <span className="input-group-text" id="basic-addon1" style={{height: '44px', 'background-color': '#decd80', color: '#202020'}}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                                </svg>
                            </span>
                                <input
                                    type="email"
                                    className={getFieldClassName('email')}
                                    placeholder="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className='input-group'>
                            <span className="input-group-text" id="basic-addon1" style={{height: '44px', 'background-color': '#decd80', color: '#202020'}}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-instagram"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z">
                                    </path>
                                </svg>
                            </span>
                                <input
                                    type="text"
                                    className={getFieldClassName('instagram_link')}
                                    placeholder="Instagram link"
                                    name="instagram_link"
                                    value={formData.instagram_link}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className='input-group'>
                            <span className="input-group-text" id="basic-addon1" style={{height: '44px', 'background-color': '#decd80', color: '#202020'}}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-instagram"
                                    viewBox="0 0 16 16">
                                        <path
                                            d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                </svg>
                            </span>
                                <input
                                    type="text"
                                    className={getFieldClassName('facebook_link')}
                                    placeholder="Facebook link"
                                    name="facebook_link"
                                    value={formData.facebook_link}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col">
                            <div className='input-group'>
                            <span className="input-group-text" id="basic-addon1" style={{height: '44px', 'background-color': '#decd80', color: '#202020'}}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-instagram"
                                    viewBox="0 0 16 16">
                                          <path
                                              d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                                </svg>
                            </span>
                                <input
                                    type="text"
                                    className={getFieldClassName('twitter_link')}
                                    placeholder="Twitter link"
                                    name="twitter_link"
                                    value={formData.twitter_link}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h5>Working times</h5>
                        <div className="row">
                            <label htmlFor="monday">Monday:</label>
                            <div className='col'>
                                <label>Opening hours</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="monday_start"
                                    name="monday_start"
                                    value={formData.monday_start}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='col'>
                                <label>Closing hours</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="monday_end"
                                    name="monday_end"
                                    value={formData.monday_end}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <label htmlFor="tuesday">Tuesday:</label>
                            <div className='col'>
                                <label>Opening hours</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="tuesday_start"
                                    name="tuesday_start"
                                    value={formData.tuesday_start}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='col'>
                                <label>Closing hours</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="tuesday_end"
                                    name="tuesday_end"
                                    value={formData.tuesday_end}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <label htmlFor="monday">Wednesday:</label>
                            <div className='col'>
                                <label>Opening hours</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="wednesday_start"
                                    name="wednesday_start"
                                    value={formData.wednesday_start}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='col'>
                                <label>Closing hours</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="wednesday_end"
                                    name="wednesday_end"
                                    value={formData.wednesday_end}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <label htmlFor="monday">Thursday:</label>
                            <div className='col'>
                                <label>Opening hours</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="thursday_start"
                                    name="thursday_start"
                                    value={formData.thursday_start}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='col'>
                                <label>Closing hours</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="thursday_end"
                                    name="thursday_end"
                                    value={formData.thursday_end}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <label htmlFor="monday">Friday:</label>
                            <div className='col'>
                                <label>Opening hours</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="friday_start"
                                    name="friday_start"
                                    value={formData.friday_start}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='col'>
                                <label>Closing hours</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="friday_end"
                                    name="friday_end"
                                    value={formData.friday_end}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <label htmlFor="monday">Saturday:</label>
                            <div className='col'>
                                <label>Opening hours</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="saturday_start"
                                    name="saturday_start"
                                    value={formData.saturday_start}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='col'>
                                <label>Closing hours</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="saturday_end"
                                    name="saturday_end"
                                    value={formData.saturday_end}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <label htmlFor="monday">Sunday:</label>
                            <div className='col'>
                                <label>Opening hours</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="sunday_start"
                                    name="sunday_start"
                                    value={formData.sunday_start}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='col'>
                                <label>Closing hours</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="sunday_end"
                                    name="sunday_end"
                                    value={formData.sunday_end}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn regular-button rounded-4">
                        {gym.id ? 'Save' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default GymForm;
