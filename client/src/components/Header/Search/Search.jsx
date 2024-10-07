import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import "./Search.scss";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom"; 

// Trie class from above
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.items = [];
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word, item) {
        let node = this.root;
        for (let char of word.toLowerCase()) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
        node.items.push(item);
    }

    searchPrefix(prefix) {
        let node = this.root;
        for (let char of prefix.toLowerCase()) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }
        return this.collectAllWords(node);
    }

    collectAllWords(node) {
        let result = [];
        if (node.isEndOfWord) {
            result = [...node.items];
        }

        for (let child in node.children) {
            result = result.concat(this.collectAllWords(node.children[child]));
        }
        return result;
    }
}

const Search = ({ setSearchModal }) => {
    const [query, setQuery] = useState("");
    const [trie, setTrie] = useState(new Trie());
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    // Fetch product data and populate the Trie
    let { data } = useFetch("/api/products?populate=*");

    useEffect(() => {
        if (data?.data) {
            const newTrie = new Trie();
            data.data.forEach((item) => {
                newTrie.insert(item.attributes.title, item);
            });
            setTrie(newTrie);
        }
    }, [data]);

    const onChange = (e) => {
        const query = e.target.value;
        setQuery(query);

        if (query.length > 0) {
            const results = trie.searchPrefix(query);
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    return (
        <div className="search-modal">
            <div className="form-field">
                <input
                    autoFocus
                    type="text"
                    placeholder="Search for products"
                    value={query}
                    onChange={onChange}
                />
                <MdClose
                    className="close-btn"
                    onClick={() => setSearchModal(false)}
                />
            </div>
            <div className="search-result-content">
                {query.length === 0 ? (
                    <div className="start-msg">
                        Start typing to see products you are looking for.
                    </div>
                ) : (
                    <div className="search-results">
                        {searchResults.map((item) => (
                            <div
                                className="search-result-item"
                                key={item.id}
                                onClick={() => {
                                    navigate("/product/" + item.id);
                                    setSearchModal(false);
                                }}
                            >
                                <div className="image-container">
                                    <img
                                        src={
                                            process.env
                                                .REACT_APP_STRIPE_APP_DEV_URL +
                                            item.attributes.img.data[0].attributes.url
                                        }
                                        alt={item.attributes.title}
                                    />
                                </div>
                                <div className="prod-details">
                                    <span className="name">
                                        {item.attributes.title}
                                    </span>
                                    <span className="desc">
                                        {item.attributes.Desc}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
