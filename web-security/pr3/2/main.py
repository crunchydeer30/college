import base64

def base64_encode_decode(input):
    encoded = base64.b64encode(input.encode()).decode()
    decoded = base64.b64decode(encoded.encode()).decode()

    return encoded, decoded

input = "Hello, World!"
encoded, decoded = base64_encode_decode(input)

print(f"Input string: {input}")
print(f"Encoded string: {encoded}")
print(f"Decoded string: {decoded}")