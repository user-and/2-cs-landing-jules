document.addEventListener('DOMContentLoaded', () => {
    // Form Validation
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const inputs = signupForm.querySelectorAll('input[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderBottomColor = 'red';
                } else {
                    input.style.borderBottomColor = '#ddd';
                }
            });

            if (isValid) {
                alert('Form submitted successfully!');
                signupForm.reset();
            }
        });
    }

    // Gauge Animations
    const animateGauges = () => {
        const gauges = document.querySelectorAll('.gauge');
        gauges.forEach(gauge => {
            const value = parseFloat(gauge.getAttribute('data-value'));
            const max = parseFloat(gauge.getAttribute('data-max'));
            const color = gauge.getAttribute('data-color');
            const progressCircle = gauge.querySelector('.gauge__progress');

            if (progressCircle) {
                const radius = progressCircle.r.baseVal.value;
                const circumference = 2 * Math.PI * radius;
                const percentage = (value / max);
                const offset = circumference - (percentage * circumference);

                progressCircle.style.strokeDasharray = circumference;
                progressCircle.style.stroke = color;

                // Trigger animation
                setTimeout(() => {
                    progressCircle.style.strokeDashoffset = offset;
                }, 100);
            }
        });
    };

    // Use Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateGauges();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroGauges = document.querySelector('.hero__gauges');
    if (heroGauges) {
        observer.observe(heroGauges);
    }
});
