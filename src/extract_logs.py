import sys
import os

# Jai Kumar
# 2K21/SE/91

def extract_logs(date):
    input_file = 'test_logs.log'  # Path to the large log file
    output_dir = 'output'
    output_file = os.path.join(output_dir, f'output_{date}.txt')

    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)

    try:
        with open(input_file, 'r') as infile, open(output_file, 'w') as outfile:
            for line in infile:
                if line.startswith(date):
                    outfile.write(line)
        print(f'Log entries for {date} have been written to {output_file}.')
    except FileNotFoundError:
        print(f'Error: {input_file} not found.')
    except Exception as e:
        print(f'An error occurred: {e}')

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print('Usage: python extract_logs.py YYYY-MM-DD')
    else:
        extract_logs(sys.argv[1])
