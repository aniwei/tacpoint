import React, { Component } from 'react';
import classnames from 'classnames';

export default class Logo extends Component {
  fullLogoRender () {
    const { type, color } = this.props;
    const classes = classnames({
      'app__logo-svg': true,
      'animated': true,
      [type === 'full' ? 'fadeIn' : 'fadeOut']: !!type
    });

    return (
      <div className={classes}>
        <svg width="146px" height="20px" viewBox="0 0 146 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-649.000000, -30.000000)" fill={color}>
              <g transform="translate(649.000000, 30.000000)">
                <polygon points="16.98795 0.0011 9.04295 0.0011 8.30695 0.0011 0.36145 0.0011 -5e-05 0.0011 -5e-05 1.4596 0.36145 1.4596 7.94545 1.4596 7.94545 19.6376 7.94545 19.9991 8.30695 19.9991 9.04295 19.9991 9.40395 19.9991 9.40395 19.6376 9.40395 1.4596 16.98795 1.4596 17.34945 1.4596 17.34945 1.0981 17.34945 0.3626 17.34945 0.0011" />
                <path d="M28.14525,0.157 C28.01275,0.0565 27.85275,0.0015 27.69125,0.0015 C27.58375,0.0015 27.48025,0.0245 27.38325,0.07 C27.24325,0.144 27.13775,0.242 27.06875,0.355 L13.90225,19.155 L13.71075,19.4335 L13.32075,20 L14.00875,20 L14.90425,20 L15.09225,20 L15.19975,19.846 L26.96625,3.0455 L26.96625,19.6385 L26.96625,20 L27.32725,20 L28.06025,20 L28.42175,20 L28.42175,19.6385 L28.42175,0.7715 C28.43475,0.53 28.33225,0.3015 28.14525,0.157" />
                <path d="M97.00465,10.0022 C97.00465,14.7097 93.17315,18.5397 88.46265,18.5397 C83.75515,18.5397 79.92565,14.7097 79.92565,10.0022 C79.92565,5.2922 83.75515,1.4602 88.46265,1.4602 C93.17315,1.4602 97.00465,5.2922 97.00465,10.0022 M88.46265,-0.0003 C82.95015,-0.0003 78.46515,4.4872 78.46515,10.0022 C78.46515,15.5147 82.95015,19.9997 88.46265,19.9997 C93.97765,19.9997 98.46515,15.5147 98.46515,10.0022 C98.46515,4.4872 93.97765,-0.0003 88.46265,-0.0003" />
                <path d="M51.49685,12.73365 L51.16285,12.59565 L51.02485,12.92965 L50.88335,13.26915 C49.55535,16.47165 46.45735,18.54065 42.99085,18.54065 C38.28135,18.54065 34.45035,14.70915 34.45035,10.00015 C34.45035,5.29115 38.28135,1.45965 42.99085,1.45965 C46.43135,1.45965 49.52035,3.50765 50.86085,6.67665 L51.00435,7.01515 L51.14485,7.34815 L51.47785,7.20715 L52.15535,6.92065 L52.48835,6.77965 L52.34735,6.44665 L52.20385,6.10765 C50.63435,2.39815 47.01835,0.00115 42.99085,0.00115 C37.47735,0.00115 32.99185,4.48665 32.99185,10.00015 C32.99185,15.51415 37.47735,19.99915 42.99085,19.99915 C47.04935,19.99915 50.67585,17.57715 52.23085,13.82765 L52.37185,13.48865 L52.51035,13.15465 L52.17635,13.01565 L51.49685,12.73365 Z"/>
                <polygon points="103.23855 0.0012 102.87705 0.0012 102.87705 0.3627 102.87705 19.6377 102.87705 19.9992 103.23855 19.9992 103.97455 19.9992 104.33555 19.9992 104.33555 19.6377 104.33555 0.3627 104.33555 0.0012 103.97455 0.0012"/>
                <path d="M68.24585,10.59545 L58.38235,10.59545 L58.38235,1.45995 L68.24585,1.45995 C70.76285,1.45995 72.81085,3.50795 72.81085,6.02545 C72.81085,8.54545 70.76285,10.59545 68.24585,10.59545 M68.08085,-5e-05 L57.28385,-5e-05 L56.92235,-5e-05 L56.92235,0.36145 L56.92235,19.63845 L56.92235,19.99995 L57.28385,19.99995 L58.02135,19.99995 L58.38235,19.99995 L58.38235,19.63845 L58.38235,12.05595 L68.24585,12.05595 C69.93385,12.05595 71.55685,11.33695 72.69835,10.08445 C73.85585,8.81345 74.40485,7.16745 74.24435,5.44945 C73.95885,2.39395 71.25185,-5e-05 68.08085,-5e-05" />
                <polygon points="145.09255 0.0012 137.14655 0.0012 136.41155 0.0012 128.46555 0.0012 128.10405 0.0012 128.10405 0.3627 128.10405 1.0982 128.10405 1.4597 128.46555 1.4597 136.04955 1.4597 136.04955 19.6377 136.04955 19.9992 136.41155 19.9992 137.14655 19.9992 137.50855 19.9992 137.50855 19.6377 137.50855 1.4597 145.09255 1.4597 145.45405 1.4597 145.45405 1.0982 145.45405 0.3627 145.45405 0.0012" />
                <path d="M122.3557,0.0012 L121.9942,0.0012 L121.9942,0.3627 L121.9942,16.9397 L110.4662,0.3162 C110.4412,0.2802 110.4112,0.2447 110.3812,0.2152 C110.2432,0.0772 110.0602,0.0012 109.8657,0.0012 C109.7697,0.0012 109.6767,0.0197 109.5877,0.0562 C109.3127,0.1707 109.1367,0.4352 109.1367,0.7307 L109.1367,19.6377 L109.1367,19.9992 L109.4977,19.9992 L110.2337,19.9992 L110.5952,19.9992 L110.5952,19.6377 L110.5952,3.0612 L122.1242,19.6867 C122.2607,19.8827 122.4847,19.9997 122.7227,19.9997 C122.7967,19.9997 122.8697,19.9887 122.9402,19.9672 C123.2472,19.8707 123.4527,19.5912 123.4527,19.2697 L123.4527,0.3627 L123.4527,0.0012 L123.0917,0.0012 L122.3557,0.0012 Z"/>
              </g>
            </g>
          </g>
        </svg>
      </div>
    );
  }

  simpleLogoRender () {
    const { type, color } = this.props;
    const classes = classnames({
      'app__logo-svg': true,
      'animated': true,
      [type !== 'full' ? 'fadeIn' : 'fadeOut']: !!type
    });

    return (
      <div className={classes}>
        <svg width="86px" height="20px" viewBox="0 0 86 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-128.000000, -30.000000)">
              <g transform="translate(115.000000, 30.000000)">
                <polygon points="16.98795 0.0011 9.04295 0.0011 8.30695 0.0011 0.36145 0.0011 -5e-05 0.0011 -5e-05 1.4596 0.36145 1.4596 7.94545 1.4596 7.94545 19.6376 7.94545 19.9991 8.30695 19.9991 9.04295 19.9991 9.40395 19.9991 9.40395 19.6376 9.40395 1.4596 16.98795 1.4596 17.34945 1.4596 17.34945 1.0981 17.34945 0.3626 17.34945 0.0011"/>
                <path fill={color} d="M28.14525,0.157 C28.01275,0.0565 27.85275,0.0015 27.69125,0.0015 C27.58375,0.0015 27.48025,0.0245 27.38325,0.07 C27.24325,0.144 27.13775,0.242 27.06875,0.355 L13.90225,19.155 L13.71075,19.4335 L13.32075,20 L14.00875,20 L14.90425,20 L15.09225,20 L15.19975,19.846 L26.96625,3.0455 L26.96625,19.6385 L26.96625,20 L27.32725,20 L28.06025,20 L28.42175,20 L28.42175,19.6385 L28.42175,0.7715 C28.43475,0.53 28.33225,0.3015 28.14525,0.157" />
                <path fill={color} d="M97.00465,10.0022 C97.00465,14.7097 93.17315,18.5397 88.46265,18.5397 C83.75515,18.5397 79.92565,14.7097 79.92565,10.0022 C79.92565,5.2922 83.75515,1.4602 88.46265,1.4602 C93.17315,1.4602 97.00465,5.2922 97.00465,10.0022 M88.46265,-0.0003 C82.95015,-0.0003 78.46515,4.4872 78.46515,10.0022 C78.46515,15.5147 82.95015,19.9997 88.46265,19.9997 C93.97765,19.9997 98.46515,15.5147 98.46515,10.0022 C98.46515,4.4872 93.97765,-0.0003 88.46265,-0.0003" />
                <path d="M51.49685,12.73365 L51.16285,12.59565 L51.02485,12.92965 L50.88335,13.26915 C49.55535,16.47165 46.45735,18.54065 42.99085,18.54065 C38.28135,18.54065 34.45035,14.70915 34.45035,10.00015 C34.45035,5.29115 38.28135,1.45965 42.99085,1.45965 C46.43135,1.45965 49.52035,3.50765 50.86085,6.67665 L51.00435,7.01515 L51.14485,7.34815 L51.47785,7.20715 L52.15535,6.92065 L52.48835,6.77965 L52.34735,6.44665 L52.20385,6.10765 C50.63435,2.39815 47.01835,0.00115 42.99085,0.00115 C37.47735,0.00115 32.99185,4.48665 32.99185,10.00015 C32.99185,15.51415 37.47735,19.99915 42.99085,19.99915 C47.04935,19.99915 50.67585,17.57715 52.23085,13.82765 L52.37185,13.48865 L52.51035,13.15465 L52.17635,13.01565 L51.49685,12.73365 Z" />
                <path d="M68.24585,10.59545 L58.38235,10.59545 L58.38235,1.45995 L68.24585,1.45995 C70.76285,1.45995 72.81085,3.50795 72.81085,6.02545 C72.81085,8.54545 70.76285,10.59545 68.24585,10.59545 M68.08085,-5e-05 L57.28385,-5e-05 L56.92235,-5e-05 L56.92235,0.36145 L56.92235,19.63845 L56.92235,19.99995 L57.28385,19.99995 L58.02135,19.99995 L58.38235,19.99995 L58.38235,19.63845 L58.38235,12.05595 L68.24585,12.05595 C69.93385,12.05595 71.55685,11.33695 72.69835,10.08445 C73.85585,8.81345 74.40485,7.16745 74.24435,5.44945 C73.95885,2.39395 71.25185,-5e-05 68.08085,-5e-05" />
              </g>
            </g>
          </g>
        </svg>
      </div>
    );
  }

  render () {
    return (
      <div className="app__logo">
        {this.simpleLogoRender()}
        {this.fullLogoRender()}
      </div>
    );
  }
}