from flask import Flask, render_template, jsonify, request
import random


app = Flask(__name__)


# Mini App 1: Simple Poll App


poll_data = {
    'question': 'Which is the superior pet?',
    'options': {'cats': 'Cats 🐈', 'dogs': 'Dogs 🐕'},
    'votes': {'cats': 0, 'dogs': 0}
}

@app.route('/poll')
def poll_page():
    """Serves the main page for the poll app."""
    return render_template('poll.html', poll=poll_data)

@app.route('/vote', methods=['POST'])
def vote():
    """API endpoint to receive a vote and return updated counts."""
    data = request.get_json()
    option = data.get('vote')

    if option in poll_data['votes']:
        poll_data['votes'][option] += 1
    
    # Return as JSON
    return jsonify(poll_data['votes'])


# Mini App 2: Color Palette Generator

def generate_random_hex_color():
    """Helper function to create a random hex color string."""
    return f'#{random.randint(0, 0xFFFFFF):06x}'

@app.route('/palette')
def palette_page():
    """Serves the main page for the color palette generator."""
    return render_template('palette.html')

@app.route('/api/palette')
def api_palette():
    """API endpoint to generate and return 5 random colors."""
    colors = [generate_random_hex_color() for _ in range(5)]
    return jsonify({'colors': colors})


if __name__ == '__main__':
    app.run(debug=True)